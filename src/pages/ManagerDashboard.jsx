//src/pages/ManagerDashboard.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchManagerProfile } from "../store/managerSlice";

export default function ManagerDashboard() {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((s) => s.manager);

  useEffect(() => {
    dispatch(fetchManagerProfile());
  }, []);

  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Manager Dashboard</h1>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {profile && (
          <div className="mt-4 p-4 bg-white shadow rounded-lg">
            <p>
              <b>Name:</b> {profile.name}
            </p>
            {/* Add more fields once you finalize manager DTO */}
          </div>
        )}
      </div>
    </>
  );
}
