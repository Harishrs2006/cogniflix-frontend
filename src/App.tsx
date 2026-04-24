import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import MovieInfoPage from "./pages/MovieInfoPage";
import MainLayout from "./layouts/MainLayout";
import { wakeUpBackend } from "./services/authService";

function App() {
  useEffect(() => {
    wakeUpBackend();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* PROTECTED / MAIN APP */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/movie/:id" element={<MovieInfoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;