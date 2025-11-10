// src/components/admin/EmployeeCard.jsx
import { useState } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../api/config";
import AddTaskForm from "./AddTaskForm";
import ConfirmDialog from "./ConfirmDialog";

export default function EmployeeCard({
  employee,
  onActionComplete,
  onViewEmployeeTasks,
}) {
  const empId = employee.id ?? employee._id;
  const [showAssign, setShowAssign] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    try {
      await axios.delete(`${BACKEND_BASE_URL}/employees/${empId}`);
      onActionComplete?.();
    } catch (err) {
      console.error("Delete employee error:", err);
      alert("Failed to delete employee. Check backend.");
    } finally {
      setDeleting(false);
      setConfirmDelete(false);
    }
  }

  return (
    <div className="p-4 border rounded flex items-center justify-between bg-white shadow-sm">
      <div>
        <div className="text-lg font-semibold">
          {employee.firstName || "Unnamed Employee"}
        </div>
        <div className="text-sm text-gray-600">
          {employee.email || "No email"}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          className="px-3 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-700"
          onClick={() => setShowAssign(true)}
        >
          Assign Task
        </button>

        <button
          className="px-3 py-1 bg-sky-600 text-white rounded hover:bg-sky-700"
          onClick={() => onViewEmployeeTasks()}
        >
          tasks list
        </button>

        <button
          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          onClick={() => setConfirmDelete(true)}
          disabled={deleting}
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>

      {showAssign && (
        <AddTaskForm
          employee={employee}
          onClose={() => setShowAssign(false)}
          onAssigned={() => {
            setShowAssign(false);
            onActionComplete?.();
          }}
        />
      )}

      {confirmDelete && (
        <ConfirmDialog
          title="Delete employee"
          message={`Are you sure you want to delete ${
            employee.firstName || employee.email
          }? This action cannot be undone.`}
          onCancel={() => setConfirmDelete(false)}
          onConfirm={handleDelete}
          loading={deleting}
        />
      )}
    </div>
  );
}
