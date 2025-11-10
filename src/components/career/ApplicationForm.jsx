// src/components/career/ApplicationForm.jsx
import { useState } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../api/config";

/**
 * Props:
 * - job (object) optional: the job the user is applying to
 * - onClose() called when modal/form closed
 * - onSuccess(optional) -> callback after successful apply
 */
export default function ApplicationForm({ job, onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    resumeLink: "",
  });
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  function handleInput(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function handleFile(e) {
    const f = e.target.files?.[0] || null;
    setFile(f);
    if (f) setForm((s) => ({ ...s, resumeLink: "" }));
  }

  async function submit(e) {
    e.preventDefault();
    setMessage(null);

    if (!form.name.trim() || !form.email.trim()) {
      setMessage({ type: "error", text: "Please provide name and email." });
      return;
    }

    if (!job?.id && !job?._id) {
      setMessage({ type: "error", text: "No job selected to apply for." });
      return;
    }

    setSubmitting(true);
    try {
      const jobId = job.id ?? job._id;
      let res;
      if (file) {
        const fd = new FormData();
        fd.append("name", form.name);
        fd.append("email", form.email);
        fd.append("phone", form.phone || "");
        fd.append("resume", file);
        res = await axios.post(`${BACKEND_BASE_URL}/jobs/${jobId}/apply`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        const payload = {
          name: form.name,
          email: form.email,
          phone: form.phone || "",
          resumeLink: form.resumeLink || "",
        };
        res = await axios.post(
          `${BACKEND_BASE_URL}/jobs/${jobId}/apply`,
          payload,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      setMessage({
        type: "success",
        text: "Application submitted — thank you!",
      });
      setForm({ name: "", email: "", phone: "", resumeLink: "" });
      setFile(null);
      if (typeof onSuccess === "function") onSuccess(res.data);
      // close after short delay so user sees message
      setTimeout(() => {
        onClose?.();
      }, 900);
    } catch (err) {
      console.error("Apply error:", err);
      setMessage({
        type: "error",
        text:
          (err?.response?.data?.message &&
            `Failed: ${err.response.data.message}`) ||
          "Failed to submit application — check backend.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  // small modal / panel style
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative max-w-xl w-full bg-white rounded shadow-lg p-6 z-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Apply for "{job?.title || "Selected Role"}"
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {message && (
          <div
            className={`mt-3 p-2 rounded ${
              message.type === "success"
                ? "bg-green-50 border-l-4 border-green-300 text-green-800"
                : "bg-red-50 border-l-4 border-red-300 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={submit} className="mt-4 space-y-3">
          <label className="block">
            <span className="text-sm">Full name</span>
            <input
              name="name"
              value={form.name}
              onChange={handleInput}
              required
              className="mt-1 block w-full px-3 py-2 border rounded"
            />
          </label>

          <label className="block">
            <span className="text-sm">Email</span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleInput}
              required
              className="mt-1 block w-full px-3 py-2 border rounded"
            />
          </label>

          <label className="block">
            <span className="text-sm">Phone (optional)</span>
            <input
              name="phone"
              value={form.phone}
              onChange={handleInput}
              className="mt-1 block w-full px-3 py-2 border rounded"
            />
          </label>

          <div>
            <span className="text-sm">Resume (file or link)</span>
            <div className="mt-2 grid gap-2">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFile}
              />
              <input
                name="resumeLink"
                value={form.resumeLink}
                onChange={handleInput}
                placeholder="Or paste resume link"
                className="mt-1 block w-full px-3 py-2 border rounded"
              />
              <p className="text-xs text-gray-500">
                If you choose a file, the file will be uploaded. Otherwise the
                resume link will be submitted.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit Application"}
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
