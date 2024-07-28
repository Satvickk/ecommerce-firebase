import { Navigate, Outlet } from 'react-router-dom'

export default function PrivateRoute() {
    const token  = localStorage.getItem("uid")

  return (
    !token ? <Navigate to={"/"} /> : <Outlet />
  )
}
