import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import { wakeUpBackend } from "./services/authService";

function App() {
  useEffect(() => {
    // Ping backend on initial load to wake it up from free tier sleep
    wakeUpBackend();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;