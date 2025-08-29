export default function JobCard({ job, onApply, isApplied }) {
  return (
    <div className="border rounded-lg p-4 shadow">
      <h3 className="text-xl font-semibold">{job.title}</h3>
      <p className="text-gray-600">{job.description}</p>
      <button
        onClick={onApply}
        disabled={isApplied}
        className={`mt-3 px-4 py-2 rounded text-white ${
          isApplied
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-800"
        }`}
      >
        {isApplied ? "Already Applied" : "Apply Now"}
      </button>
    </div>
  );
}