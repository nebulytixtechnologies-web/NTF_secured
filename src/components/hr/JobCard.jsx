// src/components/hr/JobCard.jsx
import React from "react";

export default function JobCard({ job }) {
  return (
    <div className="p-4 border rounded bg-white flex items-center justify-between">
      <div>
        <div className="font-semibold">{job.title}</div>
        <div className="text-sm text-gray-600 mt-1">
          {job.description || job.desc}
        </div>
      </div>
      <div>
        <button className="px-3 py-1 bg-sky-600 text-white rounded">
          View Job
        </button>
      </div>
    </div>
  );
}
