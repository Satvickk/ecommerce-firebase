import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoute() {
  const role = Number(window.localStorage.getItem("role"));

  return role === 2 ? <Outlet /> : <Navigate to={"/"} />;
}
