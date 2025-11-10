// src/pages/EmployeeDashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HrInfo from "../components/hr/HrInfo"; // reuse HrInfo for employee profile
import TaskList from "../components/admin/TaskList";
import ViewTasksModal from "../components/admin/ViewTasksModal";

export default function EmployeeDashboard() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedTaskAllowSubmit, setSelectedTaskAllowSubmit] = useState(false);
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

  function triggerRefresh() {
    setRefreshKey((k) => k + 1);
  }

  useEffect(() => {
    const stored =
      localStorage.getItem("neb_employee_info") ||
      localStorage.getItem("neb_user_info") ||
      localStorage.getItem("neb_user") ||
      null;

    if (stored) {
      try {
        setEmployee(JSON.parse(stored));
      } catch {
        setEmployee(null);
      }
    }
  }, []);

  function handleViewTask(task, options) {
    setSelectedTask(task);
    setSelectedTaskAllowSubmit(!!options?.allowSubmit);
  }

  function closeTaskModal() {
    setSelectedTask(null);
    setSelectedTaskAllowSubmit(false);
  }

  function handleLogout() {
    localStorage.removeItem("neb_employee_info");
    localStorage.removeItem("neb_user_info");
    localStorage.removeItem("neb_user");
    navigate("/login/employee"); // adjust route as per your setup
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Employee Dashboard
      </h1>

      {/* Employee Profile + Logout Section */}
      <div className="bg-blue-50 shadow rounded-lg p-6 w-full">
        <HrInfo role="employee" refreshKey={refreshKey} />

        <div className="flex justify-end mt-4">
          <button
            onClick={handleLogout}
            className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Task List Section */}
      <div className="mt-10 bg-gray-100 rounded-lg shadow p-6 w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
          Task List
        </h2>
        <TaskList
          key={refreshKey}
          employeeId={employee?.id ?? employee?._id ?? undefined}
          onViewTask={handleViewTask}
          onError={(msg) => {
            console.error("TaskList onError:", msg);
          }}
        />
      </div>

      {/* Task Modal */}
      {selectedTask && (
        <ViewTasksModal
          task={selectedTask}
          onClose={closeTaskModal}
          allowSubmit={selectedTaskAllowSubmit}
          onReportSubmitted={() => triggerRefresh()}
        />
      )}
    </div>
  );
}
