// src/components/hr/EmployeeList.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../api/config";
import EmployeeCard from "./EmployeeCard";

export default function EmployeeList({ refreshKey = 0, onActionComplete }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    axios
      .get(`${BACKEND_BASE_URL}/hr/getEmpList`)
      .then((res) => {
        console.log("Employee list API:", res.data);
        if (!mounted) return;
        const list = res.data?.data || [];
        setEmployees(Array.isArray(list) ? list : []);
      })
      .catch((err) => {
        console.error("Failed to fetch employees:", err);
        if (!mounted) return;
        setEmployees([]);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => (mounted = false);
  }, [refreshKey]);

  if (loading)
    return <div className="p-3 border rounded">Loading employees...</div>;
  if (!employees.length)
    return (
      <div className="p-4 border rounded text-gray-600">No employees yet.</div>
    );

  return (
    <div className="space-y-3">
      {employees.map((emp) => (
        <EmployeeCard
          key={emp.id}
          employee={emp}
          onActionComplete={onActionComplete}
        />
      ))}
    </div>
  );
}
