// src/components/admin/ViewTasksModal.jsx
import { useState } from "react";
import ViewReport from "./ViewReport";
import { BACKEND_BASE_URL, BASE_URL } from "../../api/config";
import SubmitReport from "../employee/SubmitReport";

export default function ViewTasksModal({
  task,
  onClose,
  allowSubmit = false,
  onReportSubmitted,
}) {
  const [showReport, setShowReport] = useState(false);
  const [showSubmitReport, setShowSubmitReport] = useState(false);

  if (!task) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative max-w-2xl w-full bg-white rounded shadow-lg p-6 z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Task Details</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 space-y-2">
          <div>
            <strong>Title:</strong> {task.title}
          </div>
          <div>
            <strong>Description:</strong> {task.description || "N/A"}
          </div>
          <div>
            <strong>Assigned Date:</strong>{" "}
            {task.assignedDate
              ? new Date(task.assignedDate).toLocaleDateString()
              : "N/A"}
          </div>
          <div>
            <strong>Due Date:</strong>{" "}
            {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}
          </div>
          <div>
            <strong>Status:</strong> {task.status}
          </div>
          <div>
            <strong>Employee Name:</strong> {task.employeeName}
          </div>
          <div>
            <strong>Employee Email:</strong> {task.employeeEmail}
          </div>

          {/* Attachment section */}
          {task.attachmentUrl && (
            <div>
              <strong>Attachment:</strong>{" "}
              <a
                href={`${BASE_URL}${task.attachmentUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View Attachment
              </a>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setShowReport(true)}
          >
            View Report
          </button>

          {/* show submit button only when allowed (employee view) */}
          {allowSubmit && (
            <button
              className="px-3 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-700"
              onClick={() => setShowSubmitReport(true)}
            >
              Submit Report
            </button>
          )}

          <button
            onClick={onClose}
            className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
          >
            Close
          </button>
        </div>

        {showReport && (
          <ViewReport task={task} onClose={() => setShowReport(false)} />
        )}

        {showSubmitReport && (
          <SubmitReport
            task={task}
            onClose={() => setShowSubmitReport(false)}
            onSubmitted={(result) => {
              // bubble up so parent (page) can refresh lists if needed
              onReportSubmitted?.(result);
              setShowSubmitReport(false);
              onClose?.();
            }}
          />
        )}
      </div>
    </div>
  );
}
