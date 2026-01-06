import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../service/api";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const setValue = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = "Email wajib diisi";
    if (!form.password) newErrors.password = "Password wajib diisi";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Lengkapi email dan password");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/login", form);

      // simpan token & user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login berhasil");
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Email atau password salah");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setValue("email", e.target.value)}
            placeholder="Masukkan email"
          />
          {errors.email && <small className="error">{errors.email}</small>}

          <label>Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setValue("password", e.target.value)}
            placeholder="Masukkan password"
          />
          {errors.password && (
            <small className="error">{errors.password}</small>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Memproses..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
