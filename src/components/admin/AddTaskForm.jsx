// src/components/admin/AddTaskForm.jsx
import { useState } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../api/config";

/**
 * Assign a task to an employee.
 * POST /api/admin/work/add
 *
 * Props:
 * - employee (object) required
 * - onClose()
 * - onAssigned() optional
 */
export default function AddTaskForm({ employee, onClose, onAssigned }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    attachment: null,
  });
  const [submitting, setSubmitting] = useState(false);

  function handleInput(e) {
    const { name, value, files } = e.target;
    if (name === "file") {
      const file = files?.[0] || null;
      setForm((s) => ({ ...s, attachment: file }));
    } else {
      setForm((s) => ({ ...s, [name]: value }));
    }
  }

  async function submit(e) {
    e.preventDefault();

    // basic validation
    if (!form.title.trim()) {
      alert("Please enter task title.");
      return;
    }
    if (form.attachment && form.attachment.type !== "application/pdf") {
      alert("Only PDF files are allowed for attachment.");
      return;
    }

    setSubmitting(true);
    try {
      const empId = employee.id ?? employee._id;

      const formData = new FormData();
      const dto = {
        title: form.title,
        description: form.description,
        dueDate: form.dueDate || null,
        employeeId: empId,
      };
      const jsonBlob = new Blob([JSON.stringify(dto)], {
        type: "application/json",
      });
      formData.append("dto", jsonBlob);
      if (form.attachment) {
        formData.append("file", form.attachment);
      }

      const response = await axios.post(
        `${BACKEND_BASE_URL}/admin/work/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Backend full response:", response);
      console.log("Backend response.data:", response.data);

      const msg =
        response.data?.message ||
        response.data?.data ||
        "Task assigned successfully.";
      alert(msg);

      setForm({ title: "", description: "", dueDate: "", attachment: null });
      onAssigned?.();
      onClose?.();
    } catch (err) {
      console.error("Assign task error:", err);
      const msg =
        err.response?.data?.message ?? "Failed to assign task. Check backend.";
      alert(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative max-w-lg w-full bg-white rounded shadow-lg p-6 z-10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            Assign Task to{" "}
            {employee.firstName || employee.name || employee.email}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={submit} className="mt-4 space-y-3">
          <label className="block">
            <span className="text-sm">Title</span>
            <input
              name="title"
              value={form.title}
              onChange={handleInput}
              required
              className="mt-1 block w-full px-3 py-2 border rounded"
            />
          </label>

          <label className="block">
            <span className="text-sm">Description</span>
            <textarea
              name="description"
              value={form.description}
              onChange={handleInput}
              className="mt-1 block w-full px-3 py-2 border rounded"
              rows={4}
            />
          </label>

          <label className="block">
            <span className="text-sm">Due date (optional)</span>
            <input
              name="dueDate"
              type="date"
              value={form.dueDate}
              onChange={handleInput}
              className="mt-1 block w-full px-3 py-2 border rounded"
            />
          </label>

          <label className="block">
            <span className="text-sm">Attachment (PDF only, optional)</span>
            <input
              name="file"
              type="file"
              accept="application/pdf"
              onChange={handleInput}
              className="mt-1 block w-full px-3 py-2 border rounded"
            />
          </label>

          <div className="flex items-center justify-between mt-4">
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-emerald-600 text-white rounded disabled:opacity-60"
            >
              {submitting ? "Assigning..." : "Assign Task"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 bg-gray-100 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
