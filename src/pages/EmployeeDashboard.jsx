//src/pages/EmployeeDashboard.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeeProfile } from "../store/employeeSlice";
import DashboardLayout from "../layout/DashboardLayout";

export default function EmployeeDashboard() {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((s) => s.employee);

  useEffect(() => {
    dispatch(fetchEmployeeProfile());
  }, []);

  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Employee Dashboard</h1>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {profile && (
          <div className="mt-4 p-4 bg-white shadow rounded-lg grid grid-cols-2 gap-4">
            <p>
              <b>Name:</b> {profile.firstName} {profile.lastName}
            </p>
            <p>
              <b>Email:</b> {profile.email}
            </p>
            <p>
              <b>Designation:</b> {profile.designation}
            </p>
            <p>
              <b>Department:</b> {profile.department}
            </p>
            <p>
              <b>Phone:</b> {profile.mobile}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
