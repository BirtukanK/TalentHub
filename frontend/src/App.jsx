import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Employer from './pages/Employer'
import Logout from './pages/Logout'

function App() {
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employer" element={<Employer />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
