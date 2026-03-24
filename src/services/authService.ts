import axios from "axios";

const API_URL = "http://localhost:5000/auth";

export const loginUser = async (email: string, password: string) => {
  try {
    const res = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.error || "Login failed");
  }
};

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const res = await axios.post(`${API_URL}/register`, {
      name,
      email,
      password,
    });
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.error || "Signup failed");
  }
};