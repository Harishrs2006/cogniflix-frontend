/*
FILE: ProtectedRoute.tsx

PURPOSE:
Guards routes requiring authentication, redirecting if necessary.

FLOW:
Router -> ProtectedRoute -> Check Auth -> Render Child/Redirect

USED BY:
AppRoutes.tsx

NEXT FLOW:
DashboardPage.tsx or LoginPage.tsx

*/
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SkeletonLoader from "./SkeletonLoader";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ paddingTop: '70px', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
        <SkeletonLoader type="banner" />
        <div style={{ padding: '0 4%' }}>
          <SkeletonLoader type="title" style={{ marginTop: '30px' }} />
          <div style={{ display: 'flex', gap: '10px', overflow: 'hidden' }}>
            {[1, 2, 3, 4, 5, 6].map(i => <SkeletonLoader key={i} type="card" />)}
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
