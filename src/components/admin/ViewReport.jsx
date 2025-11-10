// src/components/admin/ViewReport.jsx
import React from "react";
import { BASE_URL } from "../../api/config";

export default function ViewReport({ task, onClose }) {
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative bg-white rounded shadow-lg max-w-md w-full p-6 z-10">
        <h3 className="text-lg font-semibold">Report Details</h3>

        <div className="mt-4 space-y-2">
          <div>
            <strong>Report:</strong>{" "}
            {task.reportDetails || "No report provided."}
          </div>
          <div>
            <strong>Submitted Date:</strong>{" "}
            {task.submittedDate
              ? new Date(task.submittedDate).toLocaleDateString()
              : "Not submitted"}
          </div>

          {task.reportAttachmentUrl && (
            <div>
              <strong>Report Attachment:</strong>{" "}
              <a
                href={`${BASE_URL}${task.reportAttachmentUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View Attachment
              </a>
            </div>
          )}
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
