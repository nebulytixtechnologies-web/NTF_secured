import { Outlet } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";

export default function ClientLayout() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
