// src/pages/Career.jsx
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import JobList from "../components/career/JobList";
import ApplicationForm from "../components/career/ApplicationForm";

export default function Career() {
  const [selectedJob, setSelectedJob] = useState(null);

  function handleSelectJob(job) {
    setSelectedJob(job);
  }

  function handleCloseForm() {
    setSelectedJob(null);
  }

  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 py-10 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold">
            Careers at Nebulytix Technology
          </h1>
          <p className="mt-2 text-gray-600">
            Browse open roles below — click{" "}
            <span className="font-semibold">Apply</span> to submit your
            application.
          </p>

          <div className="mt-8">
            <JobList onSelectJobForApply={handleSelectJob} />
          </div>
        </div>

        {selectedJob && (
          <ApplicationForm
            job={selectedJob}
            onClose={handleCloseForm}
            onSuccess={() => {
              // optional: toast, refresh list, etc.
            }}
          />
        )}
      </div>
      <Footer />
    </>
  );
}
