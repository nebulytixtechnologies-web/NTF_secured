// src/components/users/AddAdminForm.jsx
import { useDispatch } from "react-redux";
import { addAdmin } from "../../store/userManagementSlice";

export default function AddAdminForm() {
  const dispatch = useDispatch();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(addAdmin({ email: "admin@test.com", password: "123456" }));
      }}
      className="bg-white p-5 rounded shadow max-w-md"
    >
      <h3 className="font-semibold mb-4">Add Admin</h3>
      <input className="input" placeholder="Email" />
      <input className="input" placeholder="Password" />
      <button className="btn-primary mt-4">Create Admin</button>
    </form>
  );
}
