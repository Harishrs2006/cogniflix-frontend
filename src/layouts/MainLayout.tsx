/*
FILE: MainLayout.tsx

PURPOSE:
Provides standard layout structure including Navbar for all main pages.

FLOW:
Router -> MainLayout -> Render Children

USED BY:
AppRoutes.tsx

NEXT FLOW:
Page Components

*/
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
function MainLayout() {
  return (
    <div
      style={{
        minHeight: "100vh",   // ✅ allow page growth
        display: "block",     // ✅ kill any flex inheritance
        backgroundColor: "#111"
      }}
    >
      <Navbar />

      <div
        style={{
          paddingTop: "70px",  // navbar offset
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;