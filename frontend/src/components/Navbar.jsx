import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-primary text-white px-6 py-3 flex justify-between items-center shadow">
      <h1 className="text-2xl font-bold">TalentHub</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:text-secondary">Jobs</Link>
        <Link to="/dashboard" className="hover:text-secondary">Dashboard</Link>
        <Link to="/employer" className="hover:text-secondary">Post Job</Link>
        <Link to="/register" className="hover:text-secondary">Register</Link>
        <Link to="/login" className="hover:text-secondary">Login</Link>
      </div>
    </nav>
  )
}
