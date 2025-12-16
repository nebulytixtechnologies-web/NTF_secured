import { Outlet } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";

export default function ManagerLayout() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
