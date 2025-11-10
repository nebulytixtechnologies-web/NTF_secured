// src/components/admin/TaskList.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../api/config";

export default function TaskList({ employeeId, onViewTask, onError }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    // choose endpoint depending on whether employeeId is provided
    const url = employeeId
      ? `${BACKEND_BASE_URL}/admin/getAllWork/${employeeId}`
      : `${BACKEND_BASE_URL}/admin/getAllWork`;

    axios
      .get(url)
      .then((res) => {
        if (!mounted) return;
        const list = res.data?.data || [];
        setTasks(list);
      })
      .catch((err) => {
        console.error("Error fetching task list:", err);
        if (!mounted) return;
        onError?.("Failed to fetch tasks.");
        setTasks([]);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [employeeId, onError]);

  if (loading) {
    return <div className="p-4">Loading tasks…</div>;
  }
  if (tasks.length === 0) {
    return <div className="p-4 text-gray-600">No tasks found.</div>;
  }

  // detect whether current user is an employee so that "View Task" can request enabling submit
  // you may adapt this detection logic if your app stores role under a different localStorage key
  const role =
    typeof window !== "undefined" ? localStorage.getItem("neb_role") : null;
  const allowSubmitByDefault = role === "employee";

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id ?? task._id}
          className="p-3 border rounded flex items-center justify-between bg-white shadow-sm"
        >
          <div>
            <div className="font-semibold">{task.title}</div>
            <div className="text-sm text-gray-600">
              Assigned:{" "}
              {task.assignedDate
                ? new Date(task.assignedDate).toLocaleDateString()
                : "N/A"}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Status: {task.status}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Employee: {task.employeeName || task.employeeEmail}
            </div>
          </div>
          <button
            className="px-3 py-1 bg-sky-600 text-white rounded hover:bg-sky-700"
            onClick={() => {
              // call parent with optional options object - parent can ignore second arg
              onViewTask?.(task, { allowSubmit: allowSubmitByDefault });
            }}
          >
            View Task
          </button>
        </div>
      ))}
    </div>
  );
}
