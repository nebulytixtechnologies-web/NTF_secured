// src/components/career/NoOpenings.jsx
import React from "react";

export default function NoOpenings({ error }) {
  return (
    <div className="p-6 border rounded text-center bg-white">
      <div className="text-2xl font-semibold text-gray-700">
        There are no openings
      </div>
      <p className="mt-2 text-gray-500">
        {error
          ? error
          : "We don't have open roles right now. Please check later."}
      </p>
    </div>
  );
}
