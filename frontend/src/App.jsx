import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'


function App() {
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
