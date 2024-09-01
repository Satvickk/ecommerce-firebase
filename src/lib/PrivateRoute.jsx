import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const authToken = window.localStorage.getItem("authToken")

  return !authToken ? <Navigate to={"/"} /> : <Outlet />;
}
