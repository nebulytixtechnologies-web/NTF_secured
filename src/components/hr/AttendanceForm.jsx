import { useState } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../api/config";

export default function AttendanceForm({ employee, onClose, onAdded }) {
  const [form, setForm] = useState({
    days: "",
  });
  const [submitting, setSubmitting] = useState(false);

  function handle(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  async function submit(e) {
    e.preventDefault();
    if (!form.days) {
      alert("Please enter the number of days attended.");
      return;
    }

    setSubmitting(true);
    try {
      const empId = employee.id ?? employee._id;
      const response = await axios.put(
        `${BACKEND_BASE_URL}/hr/editEmp/${empId}/${form.days}`
      );

      console.log("Attendance added response:", response.data);

      if (response.status === 200) {
        alert("Attendance updated successfully!");
        onAdded?.();
        onClose?.();
      } else {
        alert("Failed to update attendance.");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating attendance.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative max-w-md w-full bg-white rounded shadow p-6 z-10">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">
            Add Attendance - {employee.firstName} {employee.lastName}
          </h3>
          <button onClick={onClose} className="text-gray-500 text-xl">
            ✕
          </button>
        </div>

        <form onSubmit={submit} className="mt-4 space-y-4">
          <label className="block">
            <span className="text-sm font-medium">Days Attended</span>
            <input
              name="days"
              type="number"
              value={form.days}
              onChange={handle}
              className="mt-1 block w-full px-3 py-2 border rounded"
              placeholder="Enter number of days"
              min="0"
            />
          </label>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-emerald-600 text-white rounded"
            >
              {submitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
