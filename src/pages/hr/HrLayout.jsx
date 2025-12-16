//src/pages/hr/HrLayout.jsx
import { Outlet } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";

export default function HrLayout() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
