// src/components/admin/EmployeeList.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../api/config";
import EmployeeCard from "./EmployeeCard";

export default function EmployeeList({
  refreshKey = 0,
  onActionComplete,
  onViewEmployeeTasks,
}) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    axios
      .get(`${BACKEND_BASE_URL}/admin/getEmpList`)
      .then((res) => {
        if (!mounted) return;
        setEmployees(Array.isArray(res.data.data) ? res.data.data : []);
      })
      .catch((err) => {
        console.error("Error fetching employees:", err);
        if (!mounted) return;
        setError("Failed to load employees. Check backend.");
        setEmployees([]);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [refreshKey]);

  if (loading)
    return <div className="p-4 border rounded">Loading employees...</div>;
  if (error)
    return <div className="p-4 border rounded text-red-600">{error}</div>;

  return (
    <div className="space-y-4">
      {employees.length === 0 ? (
        <div className="p-6 border rounded text-center text-gray-600">
          No employees found.
        </div>
      ) : (
        employees.map((emp) => (
          <EmployeeCard
            key={emp.id ?? emp._id}
            employee={emp}
            onActionComplete={() => onActionComplete?.()}
            onViewEmployeeTasks={() => onViewEmployeeTasks(emp)}
          />
        ))
      )}
    </div>
  );
}
