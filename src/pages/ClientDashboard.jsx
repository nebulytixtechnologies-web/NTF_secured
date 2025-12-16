//src/pages/ClientDashboard.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClientProfile } from "../store/clientSlice";
import DashboardLayout from "../layout/DashboardLayout";

export default function ClientDashboard() {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((s) => s.client);

  useEffect(() => {
    dispatch(fetchClientProfile());
  }, []);

  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Client Dashboard</h1>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {profile && (
          <div className="mt-4 p-4 bg-white shadow rounded-lg">
            <p>
              <b>Company:</b> {profile.companyName}
            </p>
            <p>
              <b>Contact Person:</b> {profile.contactPerson}
            </p>
            <p>
              <b>Email:</b> {profile.contactEmail}
            </p>
            <p>
              <b>Phone:</b> {profile.phone}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
