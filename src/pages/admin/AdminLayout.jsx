import { Outlet } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";

export default function AdminLayout() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
