import axios from "axios";

const API_URL = "http://localhost:8000/api/auth/";

export async function register(data) {
  const res = await axios.post(`${API_URL}register/`, data);
  return res.data;
}
export const login = (data) => API_URL.post("/auth/login/", data);