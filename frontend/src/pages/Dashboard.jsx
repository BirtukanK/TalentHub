import { useEffect, useState } from "react";
import { getUserApplications } from "../api";

export default function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user")); // assuming you saved this

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getUserApplications(user.id);
        setApplications(data);
        console.log(data)
      } catch (err) {
        console.error(err);
        setError("Failed to load applications.");
      }
    };

    fetchApplications();
  }, [user.id]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-4">My Applications</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-2">
        {applications.length === 0 && <p>No applications yet.</p>}
        {applications.map((app) => (
          <li key={app.id} className="border p-3 rounded-lg bg-white">
            <span className="font-semibold">{app.job.title}</span> - 
            <span className="ml-2 text-secondary capitalize">{app.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
