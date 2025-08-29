import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-primary text-white px-6 py-3 flex justify-between items-center shadow">
      <h1 className="text-2xl font-bold">TalentHub</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:text-secondary">Jobs</Link>

        {user ? (
          <>
            {user.role === "employer" ? (
              <Link to="/employer" className="hover:text-secondary">Post Job</Link>
            ) : (
              <Link to="/dashboard" className="hover:text-secondary">Dashboard</Link>
            )}
            <button onClick={logout} className="hover:text-secondary">Logout</button>
          </>
        ) : (
          <>
            <Link to="/register" className="hover:text-secondary">Register</Link>
            <Link to="/login" className="hover:text-secondary">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}
