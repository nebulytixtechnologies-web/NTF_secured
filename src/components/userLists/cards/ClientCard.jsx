//src/components/userLists/cards/ClientCard.jsx
import { useNavigate } from "react-router-dom";

export default function ClientCard({ client }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white border rounded-lg p-4 shadow space-y-2">
      <h3 className="text-lg font-semibold">{client.companyName}</h3>

      <p className="text-sm text-gray-600">
        Contact: {client.contactPerson || "-"}
      </p>

      <div className="flex gap-3 pt-2">
        <button
          onClick={() =>
            navigate(`/admin/user-lists/clients/${client.id}`)
          }
          className="text-blue-600 text-sm"
        >
          View
        </button>

        <button className="text-green-600 text-sm">Update</button>
        <button className="text-red-600 text-sm">Delete</button>
      </div>
    </div>
  );
}
