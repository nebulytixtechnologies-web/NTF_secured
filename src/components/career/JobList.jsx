// src/components/career/JobList.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../api/config";
import JobCard from "./JobCard";
import NoOpenings from "./NoOpenings";

export default function JobList({ onSelectJobForApply }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    axios
      .get(`${BACKEND_BASE_URL}/jobs`)
      .then((res) => {
        if (!mounted) return;
        const data = Array.isArray(res.data) ? res.data : [];
        setJobs(data);
      })
      .catch(() => {
        if (!mounted) return;
        setJobs([]); // keep empty — UI will show NoOpenings
        setError("Could not load jobs from backend.");
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return <div className="p-4 border rounded">Loading job openings...</div>;
  }

  if (!jobs.length) {
    return <NoOpenings error={error} />;
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard
          key={job.id || job._id}
          job={job}
          onApply={() => onSelectJobForApply(job)}
        />
      ))}
    </div>
  );
}
