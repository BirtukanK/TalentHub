import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import { getJobs, applyToJob } from "../api";

export default function Landing() {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();
        setJobs(data);
      } catch (err) {
        setError("Failed to load jobs.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleApply = async (job) => {
    try {
      await applyToJob(job.id);
      alert(`Successfully applied to ${job.title}`);
      setAppliedJobs((prev) => new Set(prev).add(job.id));
    } catch (err) {
      const message = err.response?.data?.detail || "Failed to apply.";
      alert(message);
      console.error("Application failed:", err);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-primary mb-4">Available Jobs</h2>

      {loading && <p>Loading jobs...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid gap-4">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onApply={() => handleApply(job)}
            isApplied={appliedJobs.has(job.id)}
          />
        ))}
      </div>
    </div>
  );
}
