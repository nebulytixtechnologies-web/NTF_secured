import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login as apiLogin } from "../api/auth";
import { useDispatch, useSelector } from "react-redux";
import { setAuthData } from "../store/authSlice";
import Navbar from "../components/Navbar";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { accessToken, userDashboard } = useSelector((s) => s.auth);

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null); // FIXED
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (accessToken && userDashboard) {
      redirectToDashboard(userDashboard);
    }
  }, []);

  function redirectToDashboard(dashboard) {
    switch (dashboard) {
      case "ADMIN_DASHBOARD":
        navigate("/admin");
        break;
      case "HR_DASHBOARD":
        navigate("/hr");
        break;
      case "EMPLOYEE_DASHBOARD":
        navigate("/employee");
        break;
      case "MANAGER_DASHBOARD":
        navigate("/manager");
        break;
      case "CLIENT_DASHBOARD":
        navigate("/client");
        break;
      default:
        navigate("/");
    }
  }

  function handleInput(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!form.email || !form.password) {
      setError("Enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const data = await apiLogin(form);

      dispatch(
        setAuthData({
          accessToken: data.accessToken,
          dashboard: data.dashboard,
          roles: data.roles,
        })
      );

      redirectToDashboard(data.dashboard);
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Navbar />

      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white border rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-center">Sign in</h2>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleInput}
                className="w-full border px-3 py-2 rounded mt-1"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-medium">Password</label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleInput}
                className="w-full border px-3 py-2 rounded mt-1"
                required
              />

              <button
                type="button"
                className="absolute right-3 top-9"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>

              <div className="text-right mt-1">
                <a href="/forgot-password" className="text-sm text-blue-600">
                  Forgot Password?
                </a>
              </div>
            </div>

            {/* Error message */}
            {error && <p className="text-red-600 text-sm">{error}</p>}

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
