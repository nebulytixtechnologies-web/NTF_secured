//src/components/userLists/cards/AdminCard.jsx
import { useDispatch } from "react-redux";
import {
  deleteAdminById,
  enableAdmin,
  disableAdmin,
} from "../../../store/adminSlice";

export default function AdminCard({ admin }) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete admin: ${admin.email}?`
    );

    if (!confirmDelete) return;

    try {
      await dispatch(deleteAdminById(admin.id)).unwrap();
      alert("Admin deleted successfully");
    } catch (err) {
      alert(err);
    }
  };

  const handleToggleStatus = async () => {
    const action = admin.enabled ? "disable" : "enable";

    const confirmAction = window.confirm(
      `Are you sure you want to ${action} this admin?`
    );

    if (!confirmAction) return;

    try {
      if (admin.enabled) {
        await dispatch(disableAdmin(admin.id)).unwrap();
        alert("Admin disabled successfully");
      } else {
        await dispatch(enableAdmin(admin.id)).unwrap();
        alert("Admin enabled successfully");
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="bg-white border rounded-lg p-4 shadow space-y-2">
      <h3 className="text-lg font-semibold">{admin.email}</h3>

      <p className="text-sm text-gray-600">
        Status: {admin.enabled ? "Active" : "Disabled"}
      </p>

      <div className="flex gap-4 pt-2">
        <button
          onClick={handleToggleStatus}
          className="text-indigo-600 text-sm hover:underline"
        >
          {admin.enabled ? "Disable" : "Enable"}
        </button>

        <button
          onClick={handleDelete}
          className="text-red-600 text-sm hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
