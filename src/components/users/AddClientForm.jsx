// src/components/users/AddClientForm.jsx
import { useDispatch } from "react-redux";
import { addClient } from "../../store/userManagementSlice";

export default function AddClientForm() {
  const dispatch = useDispatch();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(addClient({ company: "Test Co" }));
      }}
      className="bg-white p-5 rounded shadow max-w-md"
    >
      <h3 className="font-semibold mb-4">Add Client</h3>
      <input className="input" placeholder="Company Name" />
      <input className="input" placeholder="Email" />
      <button className="btn-primary mt-4">Create Client</button>
    </form>
  );
}
