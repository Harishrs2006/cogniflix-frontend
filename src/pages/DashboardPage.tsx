import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logoutUser } from "../services/authService";

export default function DashboardPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getCurrentUser();
      } catch {
        navigate("/");
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#020617",
        color: "white",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <h1>Welcome to Dashboard 🚀</h1>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}