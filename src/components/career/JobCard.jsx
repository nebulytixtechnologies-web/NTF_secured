// src/components/career/JobCard.jsx
import React from "react";

export default function JobCard({ job, onApply }) {
  const id = job.id ?? job._id ?? "unknown";
  return (
    <div className="p-4 border rounded shadow-sm bg-white">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold">
            {job.title || "Untitled Role"}
          </h3>
          {job.company && (
            <div className="text-sm text-gray-500">{job.company}</div>
          )}
          <p className="text-sm text-gray-600 mt-2">
            {job.desc || job.description || "No description provided."}
          </p>

          <div className="text-xs text-gray-500 mt-3">
            <span className="mr-3">📍 {job.location || "Not specified"}</span>
            <span>
              💼 {job.experience || job.experienceLevel || "Not specified"}
            </span>
            <span className="ml-3">ID: {id}</span>
          </div>
        </div>

        <div className="ml-4 flex-shrink-0">
          <button
            onClick={onApply}
            className="px-3 py-1 bg-sky-600 text-white rounded hover:bg-sky-700"
            aria-label={`Apply for ${job.title}`}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
