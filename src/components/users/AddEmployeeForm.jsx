// src/components/users/AddEmployeeForm.jsx
import { useDispatch } from "react-redux";
import { addEmployee } from "../../store/userManagementSlice";

export default function AddEmployeeForm({ role }) {
  const dispatch = useDispatch();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(addEmployee({ role, data: {} }));
      }}
      className="bg-white p-5 rounded shadow max-w-md"
    >
      <h3 className="font-semibold mb-4">Add {role}</h3>
      <input className="input" placeholder="Email" />
      <input className="input" placeholder="Password" />
      <button className="btn-primary mt-4">Create {role}</button>
    </form>
  );
}
