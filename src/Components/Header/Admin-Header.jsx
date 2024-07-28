import { Link } from "react-router-dom";

export default function AdminHeader() {
  return (
    <div className="navbar bg-black">
      <div className="navbar-start">
        <Link
          className="btn btn-ghost text-xl text-white"
          to="/"
          data-theme="wireframe"
        >
          Admin Panel
        </Link>
      </div>
      <div className="flex navbar-end gap-4 mt-3 mr-3">
        <Link
          className="btn border-2 border-red-600 text-red-600 bg-transparent hover:bg-red-600 hover:text-black"
          to={"/"}
        >
          Logout
        </Link>
      </div>
    </div>
  );
}
