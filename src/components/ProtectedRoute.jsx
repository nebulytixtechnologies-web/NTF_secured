import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRole }) {
  const { accessToken, userDashboard } = useSelector((s) => s.auth);
  const persist = useSelector((s) => s._persist);

  // Wait until redux-persist rehydrates
  if (!persist.rehydrated) return null;

  if (!accessToken) return <Navigate to="/login" replace />;

  if (allowedRole && allowedRole !== userDashboard) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
