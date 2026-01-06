import { Navigate } from "react-router-dom";

function AuthGuard({ children }) {
  // ambil token login
  const token = localStorage.getItem("token");

  // kalau belum login → redirect ke login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // kalau sudah login → tampilkan halaman
  return children;
}

export default AuthGuard;
