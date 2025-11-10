// src/components/hr/TaskReportModal.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../api/config";

/**
 * GET /employees/:id/tasks/report
 */
export default function TaskReportModal({ employee, onClose }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const empId = employee.id ?? employee._id;
    axios
      .get(`${BACKEND_BASE_URL}/employees/${empId}/tasks/report`)
      .then((res) => {
        if (!mounted) return;
        setReport(res.data);
      })
      .catch((err) => {
        console.error(err);
        if (!mounted) return;
        setReport(null);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => (mounted = false);
  }, [employee]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative max-w-2xl w-full bg-white rounded shadow p-6 z-10">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">
            Task Report - {employee.name}
          </h3>
          <button onClick={onClose} className="text-gray-500">
            ✕
          </button>
        </div>

        <div className="mt-4">
          {loading ? (
            <div>Loading report...</div>
          ) : !report ? (
            <div>No report available.</div>
          ) : (
            <div className="space-y-3">
              {/* render report as available fields */}
              <div>
                <strong>Total tasks:</strong>{" "}
                {report.totalTasks ?? report.length ?? "N/A"}
              </div>
              <div className="mt-2">
                <ul className="space-y-2">
                  {(report.tasks ?? report).map((t) => (
                    <li key={t.id ?? t._id} className="p-3 border rounded">
                      <div className="font-semibold">{t.title}</div>
                      <div className="text-sm text-gray-600">
                        {t.description}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Status: {t.status || "N/A"}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
