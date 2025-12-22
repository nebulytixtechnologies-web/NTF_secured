import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ClientDetails() {
  const { clientId } = useParams();

  const client = useSelector((s) =>
    s.userLists.clients.find((c) => String(c.id) === String(clientId))
  );

  if (!client) {
    return <p className="text-gray-500">Client not found</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{client.companyName}</h1>

      {/* CLIENT DETAILS */}
      <div className="bg-white p-6 rounded-lg shadow grid md:grid-cols-2 gap-4">
        <p>
          <b>Contact Person:</b> {client.contactPerson}
        </p>
        <p>
          <b>Email:</b> {client.contactEmail}
        </p>
        <p>
          <b>Phone:</b> {client.phone}
        </p>
        <p>
          <b>Alternate Phone:</b> {client.alternatePhone}
        </p>
        <p>
          <b>Industry:</b> {client.industryType}
        </p>
        <p>
          <b>GST:</b> {client.gstNumber}
        </p>
        <p>
          <b>Website:</b> {client.website}
        </p>
        <p className="md:col-span-2">
          <b>Address:</b> {client.address}
        </p>
      </div>

      {/* ACTIONS */}
      <div className="flex flex-wrap gap-4">
        <button className="btn-primary">➕ Add Project</button>
        <button className="btn-secondary">📋 Project List</button>
        <button className="btn-warning">✏️ Edit Client</button>
        <button className="btn-danger">🗑 Delete Client</button>
      </div>
    </div>
  );
}
