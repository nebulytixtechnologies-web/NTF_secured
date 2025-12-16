export default function UsersList({ role }) {
  // Dummy data (temporary)
  const dummyUsers = {
    ADMIN: [
      { id: 1, email: "admin1@gmail.com", enabled: true },
      { id: 2, email: "admin2@gmail.com", enabled: false },
    ],
    MANAGER: [{ id: 3, email: "manager1@gmail.com", enabled: true }],
    HR: [{ id: 4, email: "hr1@gmail.com", enabled: true }],
    EMPLOYEE: [
      { id: 5, email: "emp1@gmail.com", enabled: true },
      { id: 6, email: "emp2@gmail.com", enabled: true },
    ],
    CLIENT: [{ id: 7, email: "client1@gmail.com", enabled: true }],
  };

  const users = dummyUsers[role] || [];

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-4">{role} List</h2>

      {users.length === 0 && <p className="text-gray-500">No users found.</p>}

      {users.length > 0 && (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{u.email}</td>
                  <td className="px-4 py-3">{role}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium
                        ${
                          u.enabled
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                      {u.enabled ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
