import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addClient, clearStatus } from "../../store/userManagementSlice";
import { useNavigate } from "react-router-dom";

export default function AddClientForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, success, error } = useSelector((s) => s.userManagement);

  const [form, setForm] = useState({
    // USER
    email: "",
    password: "",

    // CLIENT
    companyName: "",
    contactPerson: "",
    contactEmail: "",
    phone: "",
    alternatePhone: "",
    address: "",
    website: "",
    industryType: "",
    gstNumber: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addClient({
        userDto: {
          email: form.email,
          password: form.password,
          roles: ["ROLE_CLIENT"], // 🔐 always backend-safe
        },
        clientReq: {
          companyName: form.companyName,
          contactPerson: form.contactPerson,
          contactEmail: form.contactEmail,
          phone: form.phone,
          alternatePhone: form.alternatePhone,
          address: form.address,
          website: form.website,
          industryType: form.industryType,
          gstNumber: form.gstNumber,
        },
      })
    );
  };

  /* ================= SUCCESS HANDLER ================= */
  useEffect(() => {
    if (success) {
      alert("Client created successfully");
      dispatch(clearStatus());
      navigate("/admin/user-lists?type=clients");
    }
  }, [success, dispatch, navigate]);

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <h2 className="text-xl font-semibold">Add Client</h2>

      {/* ================= USER DETAILS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="input"
          />
        </div>

        <div>
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="input"
          />
        </div>
      </div>

      {/* ================= CLIENT DETAILS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="form-label">Company Name</label>
          <input
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            required
            className="input"
          />
        </div>

        <div>
          <label className="form-label">Contact Person</label>
          <input
            name="contactPerson"
            value={form.contactPerson}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div>
          <label className="form-label">Contact Email</label>
          <input
            type="email"
            name="contactEmail"
            value={form.contactEmail}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div>
          <label className="form-label">Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div>
          <label className="form-label">Alternate Phone</label>
          <input
            name="alternatePhone"
            value={form.alternatePhone}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div>
          <label className="form-label">Industry Type</label>
          <input
            name="industryType"
            value={form.industryType}
            onChange={handleChange}
            className="input"
            placeholder="IT, Finance, Construction..."
          />
        </div>

        <div>
          <label className="form-label">Website</label>
          <input
            name="website"
            value={form.website}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div>
          <label className="form-label">GST Number</label>
          <input
            name="gstNumber"
            value={form.gstNumber}
            onChange={handleChange}
            className="input"
          />
        </div>
      </div>

      <div>
        <label className="form-label">Address</label>
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          rows={3}
          className="input"
        />
      </div>

      {/* ================= ACTION BAR ================= */}
      {error && <p className="text-red-600">{error}</p>}

      <div className="flex justify-end pt-6 border-t">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Client"}
        </button>
      </div>
    </form>
  );
}
