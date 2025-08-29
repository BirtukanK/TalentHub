import axios from "axios";

const API_URL = "http://localhost:8000/api/auth/";
const JOBS_URL = "http://localhost:8000/api/jobs/";

export async function register(data) {
  const res = await axios.post(`${API_URL}register/`, data);
  return res.data;
}
export async function login(data) {
  const res = await axios.post(`${AUTH_URL}login/`, data);
  const { access, refresh } = res.data.token;

  // Store tokens
  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);

  // Optional: store user info
  localStorage.setItem("user", JSON.stringify(res.data.user));

  return res.data;
}

export async function logout() {
  const refresh = localStorage.getItem("refresh");
  return axios.post(`${API_URL}auth/logout/`, { refresh }, {
    headers: { Authorization: `Bearer ${localStorage.getItem("access")}` }
  });
}

export async function getJobs() {
  const res = await axios.get(JOBS_URL);
  return res.data;
}

export async function createJob(jobData) {
  const accessToken = localStorage.getItem("access");
  console.log("Access token:", accessToken);
  const res = await axios.post(JOBS_URL, jobData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
}

export async function applyToJob(jobId) {
  const accessToken = localStorage.getItem("access");

  return axios.post(
    "http://localhost:8000/api/applications",
    { job_id: jobId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
}

export async function getUserApplications(userId) {
  const accessToken = localStorage.getItem("access");

  const res = await axios.get(`http://localhost:8000/api/applications/${userId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  return res.data;
}