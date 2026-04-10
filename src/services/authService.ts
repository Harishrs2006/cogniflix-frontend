import axios from "axios";

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://cogniflix-backend.onrender.com";

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/auth`,
  withCredentials: true,
});

// ================= LOGIN =================
export const loginUser = async (email: string, password: string) => {
  try {
    const res = await api.post("/login", { email, password });
    return res.data;
  } catch (err: unknown) {
    const e = err as { response?: { data?: { error?: string } } };
    throw new Error(e.response?.data?.error || "Login failed");
  }
};

// ================= REGISTER =================
export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const res = await api.post("/register", { name, email, password });
    return res.data;
  } catch (err: unknown) {
    const e = err as { response?: { data?: { error?: string } } };
    throw new Error(e.response?.data?.error || "Signup failed");
  }
};

// ================= GET CURRENT USER =================
export const getCurrentUser = async () => {
  try {
    const res = await api.get("/me");
    return res.data;
  } catch {
    throw new Error("Not authenticated");
  }
};

// ================= LOGOUT =================
export const logoutUser = async () => {
  try {
    await api.post("/logout");
  } catch {
    console.error("Logout failed");
  }
};

// ================= WAKE UP BACKEND =================
export const wakeUpBackend = async () => {
  try {
    await axios.get(`${API_BASE_URL}/api/test`);
  } catch {
    // Ignore — just a ping to wake free-tier server
  }
};