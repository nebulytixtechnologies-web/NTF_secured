import { Outlet } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";

export default function EmployeeLayout() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
