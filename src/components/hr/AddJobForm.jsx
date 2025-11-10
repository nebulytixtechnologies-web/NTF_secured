import { useState } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../api/config";

export default function AddJobForm({ onClose, onAdded }) {
  const [form, setForm] = useState({
    jobTitle: "",
    domain: "",
    jobType: "",
    experienceLevel: "",
    description: "",
    requirements: "",
    responsibilities: "",
    salaryRange: "",
    postedDate: "",
    closingDate: "",
  });
  const [submitting, setSubmitting] = useState(false);

  function handleInput(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function submit(e) {
    e.preventDefault();

    if (!form.jobTitle.trim() || !form.domain.trim()) {
      alert("Please fill all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await axios.post(
        `${BACKEND_BASE_URL}/admin/job/add`,
        form
      );

      const msg = response.data?.message || "Job added successfully.";
      alert(msg);

      setForm({
        jobTitle: "",
        domain: "",
        jobType: "",
        experienceLevel: "",
        description: "",
        requirements: "",
        responsibilities: "",
        salaryRange: "",
        postedDate: "",
        closingDate: "",
      });

      onAdded?.();
      onClose?.();
    } catch (err) {
      console.error("Add job error:", err);
      const msg =
        err.response?.data?.message ?? "Failed to add job. Check backend.";
      alert(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-2xl max-w-4xl w-full p-8 z-10 border border-indigo-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-indigo-700">➕ Add New Job</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={submit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* LEFT SIDE */}
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">
                Job Title
              </span>
              <input
                name="jobTitle"
                value={form.jobTitle}
                onChange={handleInput}
                required
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">Domain</span>
              <input
                name="domain"
                value={form.domain}
                onChange={handleInput}
                required
                placeholder="e.g., Java, Python, .NET"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">
                Job Type
              </span>
              <select
                name="jobType"
                value={form.jobType}
                onChange={handleInput}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select</option>
                <option value="FULL_TIME">Full Time</option>
                <option value="PART_TIME">Part Time</option>
                <option value="CONTRACT">Contract</option>
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">
                Experience Level
              </span>
              <select
                name="experienceLevel"
                value={form.experienceLevel}
                onChange={handleInput}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select</option>
                <option value="ENTRY">Entry</option>
                <option value="MID">Mid</option>
                <option value="SENIOR">Senior</option>
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">
                Salary Range
              </span>
              <input
                name="salaryRange"
                value={form.salaryRange}
                onChange={handleInput}
                placeholder="e.g., 5 LPA - 10 LPA"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </label>

            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm font-medium text-gray-700">
                  Posted Date
                </span>
                <input
                  type="date"
                  name="postedDate"
                  value={form.postedDate}
                  onChange={handleInput}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">
                  Closing Date
                </span>
                <input
                  type="date"
                  name="closingDate"
                  value={form.closingDate}
                  onChange={handleInput}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </label>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">
                Description
              </span>
              <textarea
                name="description"
                value={form.description}
                onChange={handleInput}
                rows={3}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">
                Requirements
              </span>
              <textarea
                name="requirements"
                value={form.requirements}
                onChange={handleInput}
                rows={3}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">
                Responsibilities
              </span>
              <textarea
                name="responsibilities"
                value={form.responsibilities}
                onChange={handleInput}
                rows={3}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </label>
          </div>

          {/* BUTTONS */}
          <div className="md:col-span-2 flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {submitting ? "Saving..." : "Add Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
