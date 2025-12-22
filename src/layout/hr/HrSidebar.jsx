//src/layout/hr/HrSidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, FileText } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function HrSidebar() {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);
  const sidebarRef = useRef(null);

  // Close flyout on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <aside
      ref={sidebarRef}
      className="fixed left-0 top-0 w-20 h-screen bg-[#0D243C] text-white flex flex-col items-center z-30"
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center font-bold">NXT</div>

      <nav className="flex-1 mt-6 flex flex-col items-center gap-4">
        {/* HR HOME */}
        <NavLink to="/hr" className="sidebar-icon">
          <LayoutDashboard size={20} />
        </NavLink>

        {/* USERS (FLYOUT) */}
        <SidebarFlyout
          icon={<Users size={20} />}
          open={openMenu === "users"}
          onToggle={() => setOpenMenu(openMenu === "users" ? null : "users")}
          items={[
            {
              label: "Add Employee",
              path: "/hr/employees/add",
            },
            {
              label: "Employee List",
              path: "/hr/employees",
            },
          ]}
          onSelect={(path) => {
            navigate(path);
            setOpenMenu(null);
          }}
        />

        {/* REPORTS */}
        <NavLink to="/hr/reports" className="sidebar-icon">
          <FileText size={20} />
        </NavLink>
      </nav>
    </aside>
  );
}

/* ================= FLYOUT ================= */

function SidebarFlyout({ icon, items, open, onToggle, onSelect }) {
  return (
    <div className="relative">
      <button onClick={onToggle} className="sidebar-icon">
        {icon}
      </button>

      {open && (
        <div className="absolute left-14 top-0 w-44 bg-white text-gray-800 rounded-lg shadow-lg z-50">
          {items.map((i) => (
            <button
              key={i.path}
              onClick={() => onSelect(i.path)}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              {i.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
