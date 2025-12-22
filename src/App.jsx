import { Routes, Route } from "react-router-dom";

// Public
import Home from "./pages/Home";
import LoginForm from "./pages/LoginForm";
import Career from "./pages/Career";
import JobDetails from "./pages/JobDetails";
import Contacts from "./pages/contacts";
import About from "./pages/About";

// Admin
import AdminLayout from "./layout/admin/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import UserLists from "./pages/admin/UserLists";
import ClientDetails from "./pages/admin/ClientDetails";

// Admin forms
import AddAdminForm from "./components/users/AddAdminForm";
import AddClientForm from "./components/users/AddClientForm";
import AddEmployeeForm from "./components/users/AddEmployeeForm";

// HR
import HrLayout from "./layout/hr/HrLayout";
import HrDashboard from "./pages/HrDashboard";

// Manager
import ManagerLayout from "./layout/manager/ManagerLayout";
import ManagerDashboard from "./pages/ManagerDashboard";

// Employee
import EmployeeLayout from "./layout/employee/EmployeeLayout";
import EmployeeDashboard from "./pages/EmployeeDashboard";

// Client
import ClientLayout from "./layout/client/ClientLayout";
import ClientDashboard from "./pages/ClientDashboard";

// Protected
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      {/* ================= PUBLIC ================= */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/career" element={<Career />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/about" element={<About />} />
      <Route path="/career/job/:id" element={<JobDetails />} />

      {/* ================= ADMIN ================= */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRole="ADMIN_DASHBOARD">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />

        <Route path="user-lists" element={<UserLists />} />
        <Route
          path="user-lists/clients/:clientId"
          element={<ClientDetails />}
        />

        <Route path="users" element={<UserManagement />}>
          <Route path="add-admin" element={<AddAdminForm />} />
          <Route
            path="add-manager"
            element={<AddEmployeeForm role="Manager" mode="ADMIN" />}
          />
          <Route
            path="add-hr"
            element={<AddEmployeeForm role="HR" mode="ADMIN" />}
          />
          <Route
            path="add-employee"
            element={<AddEmployeeForm role="Employee" mode="ADMIN" />}
          />
          <Route path="add-client" element={<AddClientForm />} />
        </Route>
      </Route>

      {/* ================= HR ================= */}
      <Route
        path="/hr"
        element={
          <ProtectedRoute allowedRole="HR_DASHBOARD">
            <HrLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<HrDashboard />} />

        {/* HR EMPLOYEE ACTIONS */}
        <Route
          path="employees/add"
          element={<AddEmployeeForm role="Employee" mode="HR" />}
        />
      </Route>

      {/* ================= MANAGER ================= */}
      <Route
        path="/manager"
        element={
          <ProtectedRoute allowedRole="MANAGER_DASHBOARD">
            <ManagerLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<ManagerDashboard />} />
      </Route>

      {/* ================= EMPLOYEE ================= */}
      <Route
        path="/employee"
        element={
          <ProtectedRoute allowedRole="EMPLOYEE_DASHBOARD">
            <EmployeeLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<EmployeeDashboard />} />
      </Route>

      {/* ================= CLIENT ================= */}
      <Route
        path="/client"
        element={
          <ProtectedRoute allowedRole="CLIENT_DASHBOARD">
            <ClientLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<ClientDashboard />} />
      </Route>
    </Routes>
  );
}
