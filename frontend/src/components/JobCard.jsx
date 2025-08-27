export default function JobCard({ job, onApply }) {
    return (
      <div className="border rounded-2xl shadow-sm p-4 bg-white hover:shadow-md transition">
        <h3 className="text-xl font-semibold text-primary">{job.title}</h3>
        <p className="text-gray-600">{job.description}</p>
        <button
          onClick={onApply}
          className="mt-3 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Apply Now
        </button>
      </div>
    )
  }
  