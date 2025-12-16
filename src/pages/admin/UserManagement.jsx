import { useNavigate, useLocation, Outlet } from "react-router-dom";
import RightDrawer from "../../components/common/RightDrawer";

export default function UserManagement() {
  const navigate = useNavigate();
  const location = useLocation();

  // Drawer opens when route includes /add-
  const drawerOpen = location.pathname.includes("/add-");

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">User Management</h1>

      {/* Buttons */}
      <div className="flex gap-3 mb-6">
        <button onClick={() => navigate("add-admin")} className="btn">
          Add Admin
        </button>
        <button onClick={() => navigate("add-manager")} className="btn">
          Add Manager
        </button>
        <button onClick={() => navigate("add-hr")} className="btn">
          Add HR
        </button>
        <button onClick={() => navigate("add-employee")} className="btn">
          Add Employee
        </button>
        <button onClick={() => navigate("add-client")} className="btn">
          Add Client
        </button>
      </div>

      {/* Drawer */}
      <RightDrawer open={drawerOpen} onClose={() => navigate("/admin/users")}>
        <Outlet />
      </RightDrawer>
    </div>
  );
}
