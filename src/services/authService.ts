import axios from "axios";

// ✅ SINGLE SOURCE OF TRUTH (no env dependency)
const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://cogniflix-backend.onrender.com";

const api = axios.create({
  baseURL: `${API_BASE_URL}/auth`,
  withCredentials: true,
});

// ================= LOGIN =================
export const loginUser = async (email: string, password: string) => {
  try {
    const res = await api.post("/login", {
      email,
      password,
    });
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.error || "Login failed");
  }
};

// ================= REGISTER =================
export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const res = await api.post("/register", {
      name,
      email,
      password,
    });
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.error || "Signup failed");
  }
};

// ================= GET USER =================
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

// ================= WAKE UP SERVER =================
export const wakeUpBackend = async () => {
  try {
    // Just a ping to wake up from free tier sleep
    await axios.get(`${API_BASE_URL}/test`);
  } catch (err) {
    // Ignore error
  }
};