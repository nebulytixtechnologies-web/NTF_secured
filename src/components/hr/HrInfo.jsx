// src/components/hr/HrInfo.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../api/config";

export default function HrInfo({ role = "hr", refreshKey = 0 }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const LOCAL_KEY =
    role === "admin"
      ? "neb_admin_info"
      : role === "hr"
      ? "neb_hr_info"
      : "neb_employee_info";

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const raw = localStorage.getItem(LOCAL_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (mounted) {
            setProfile(parsed);
            setLoading(false);
            return;
          }
        }
      } catch (e) {
        console.warn("Failed to read profile from localStorage", e);
      }

      const token = localStorage.getItem("neb_token");
      if (!token) {
        if (mounted) {
          setError("No auth token found.");
          setLoading(false);
        }
        return;
      }

      const endpoint =
        role === "admin"
          ? "/admin/profile"
          : role === "hr"
          ? "/hr/profile"
          : "/employee/profile";

      try {
        const res = await axios.get(`${BACKEND_BASE_URL}${endpoint}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        const body = res.data;
        const unwrapped = body?.data ?? body;
        if (mounted) setProfile(unwrapped);
      } catch (err) {
        console.warn("Profile fetch error", err);
        if (mounted) setError("Failed to load profile from server.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [LOCAL_KEY, refreshKey, role]);

  if (loading) {
    return (
      <div className="p-4 bg-white rounded shadow">
        <div className="animate-pulse space-y-3">
          <div className="h-6 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-white rounded shadow text-red-600">{error}</div>
    );
  }

  if (!profile) {
    return (
      <div className="p-4 bg-white rounded shadow text-gray-600">
        Profile not available.
      </div>
    );
  }

  const {
    firstName,
    lastName,
    email,
    mobile,
    cardNumber,
    jobRole,
    domain,
    gender,
    joiningDate,
    daysPresent,
    paidLeaves,
  } = profile;

  return (
    <div className="p-4 bg-white rounded shadow flex gap-6">
      {/* Left: Image & Name */}
      <div className="flex flex-col items-center gap-2">
        <div className="h-24 w-24 rounded-full bg-sky-100 flex items-center justify-center text-2xl font-semibold text-sky-700">
          {firstName ? firstName.charAt(0).toUpperCase() : "U"}
        </div>
        <div className="text-lg font-semibold text-center">
          {firstName ?? ""} {lastName ?? ""}
        </div>
      </div>

      {/* Right: Profile details */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
        <div>
          <div className="text-xs text-gray-500">Email</div>
          <div>{email ?? "—"}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Mobile</div>
          <div>{mobile ?? "—"}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Card Number</div>
          <div>{cardNumber ?? "—"}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Gender</div>
          <div>{gender ?? "—"}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Joining Date</div>
          <div>
            {joiningDate ? new Date(joiningDate).toLocaleDateString() : "—"}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Job Role / Domain</div>
          <div>{jobRole ?? domain ?? "—"}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Days Present</div>
          <div>{daysPresent ?? "—"}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Paid Leaves</div>
          <div>{paidLeaves ?? "—"}</div>
        </div>
      </div>
    </div>
  );
}
