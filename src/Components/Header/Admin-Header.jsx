import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminHeader() {

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      navigate('/')
    } catch (error) {
      toast.error("Unable to logout");
    }
  };
  return (
    <div className="navbar bg-black">
      <div className="navbar-start">
        <Link
          className="btn btn-ghost text-xl text-white"
          to="/admin"
          data-theme="wireframe"
        >
          Admin Panel
        </Link>
      </div>
      <div className="flex navbar-end gap-4 mt-3 mr-3">
        <button
          className="btn border-2 border-red-600 text-red-600 bg-transparent hover:bg-red-600 hover:text-black"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
