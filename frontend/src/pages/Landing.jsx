import JobCard from '../components/JobCard'

const jobs = [
  { id: 1, title: "Frontend Developer", description: "Work on UI with React & Tailwind." },
  { id: 2, title: "Backend Developer", description: "Build APIs with Django REST Framework." }
]

export default function Landing() {
  const handleApply = (job) => {
    alert(`Applied to ${job.title}!`)
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-primary mb-4">Available Jobs</h2>
      <div className="grid gap-4">
        {jobs.map(job => (
          <JobCard key={job.id} job={job} onApply={() => handleApply(job)} />
        ))}
      </div>
    </div>
  )
}
