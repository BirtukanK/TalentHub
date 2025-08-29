// import { useState } from 'react'

// export default function Employer() {
//   const [title, setTitle] = useState("")
//   const [description, setDescription] = useState("")

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     alert(`Posted Job: ${title}`)
//   }

//   return (
//     <div className="max-w-md mx-auto mt-10">
//       <h2 className="text-2xl font-bold text-primary mb-4">Post a Job</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           placeholder="Job Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full border rounded-lg p-2"
//         />
//         <textarea
//           placeholder="Job Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="w-full border rounded-lg p-2"
//         />
//         <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-900">
//           Post Job
//         </button>
//       </form>
//     </div>
//   )
// }

import { useState } from "react";
import { createJob } from "../api";

export default function Employer() {
  const [form, setForm] = useState({ title: "", description: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from refreshing page
    try {
      console.log("Submitting:", form); // Debug
      await createJob(form);
      setMessage("Job posted successfully!");
      setForm({ title: "", description: "" });
    } catch (err) {
      console.error("Error posting job:", err.response?.data || err.message);
      setMessage("Failed to post job. Are you logged in?");
    }
  };
  

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold text-primary mb-4">Post a Job</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Job Title"
          className="w-full border rounded-lg p-2"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Job Description"
          className="w-full border rounded-lg p-2"
        />
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-900"
        >
          Post Job
        </button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}

