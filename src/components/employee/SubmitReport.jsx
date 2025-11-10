import { useState } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../api/config";

export default function SubmitReport({ task, onClose, onSubmitted }) {
  const [status, setStatus] = useState(task?.status || "IN_PROGRESS");
  const [reportDetails, setReportDetails] = useState("");
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const taskId = task?.id ?? task?._id;

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const form = new FormData();
      form.append("status", status);
      form.append("reportDetails", reportDetails);
      if (file) {
        form.append("reportAttachment", file);
      }

      const url = `${BACKEND_BASE_URL}/employee/task/submit/${taskId}`;

      const res = await axios.put(url, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onSubmitted?.(res.data.data);
      alert("Report submitted successfully!");
    } catch (err) {
      console.error("Submit report error:", err);
      alert("Failed to submit report. Please check console.");
    } finally {
      setSubmitting(false);
      onClose?.();
    }
  }

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <form
        onSubmit={handleSubmit}
        className="relative bg-white rounded shadow-lg max-w-lg w-full p-6 z-10"
      >
        <h3 className="text-lg font-semibold">Submit Report</h3>

        <div className="mt-4 space-y-3">
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 block w-full border rounded p-2"
            >
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="COMPLETED">COMPLETED</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Report details</label>
            <textarea
              required
              value={reportDetails}
              onChange={(e) => setReportDetails(e.target.value)}
              rows={5}
              className="mt-1 block w-full border rounded p-2"
              placeholder="Describe the work, obstacles, results..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Attachment (optional)</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="mt-1 block w-full"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-700"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Report"}
          </button>
        </div>
      </form>
    </div>
  );
}
