// src/components/hr/EditEmployeeForm.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../api/config";

/**
 * Props:
 * - employeeId (required)
 * - onClose()
 * - onUpdated()
 */
export default function EditEmployeeForm({ employeeId, onClose, onUpdated }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let mounted = true;
    axios
      .get(`${BACKEND_BASE_URL}/employees/${employeeId}`)
      .then((res) => {
        if (!mounted) return;
        setForm({
          name: res.data.name || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
        });
      })
      .catch(() => {})
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => (mounted = false);
  }, [employeeId]);

  function handle(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  async function submit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.put(`${BACKEND_BASE_URL}/employees/${employeeId}`, form);
      onUpdated?.();
      onClose?.();
    } catch (err) {
      console.error(err);
      alert("Failed to update employee.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative max-w-md w-full bg-white rounded shadow p-6 z-10">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold">Edit Employee</h3>
          <button onClick={onClose} className="text-gray-500">
            ✕
          </button>
        </div>
        <form onSubmit={submit} className="mt-4 space-y-3">
          <label className="block">
            <span className="text-sm">Name</span>
            <input
              name="name"
              value={form.name}
              onChange={handle}
              className="mt-1 block w-full px-3 py-2 border rounded"
              required
            />
          </label>
          <label className="block">
            <span className="text-sm">Email</span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handle}
              className="mt-1 block w-full px-3 py-2 border rounded"
              required
            />
          </label>
          <label className="block">
            <span className="text-sm">Phone</span>
            <input
              name="phone"
              value={form.phone}
              onChange={handle}
              className="mt-1 block w-full px-3 py-2 border rounded"
            />
          </label>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-indigo-600 text-white rounded"
            >
              {submitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
