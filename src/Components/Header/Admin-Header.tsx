import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminHeader() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      navigate('/');
    } catch (error) {
      toast.error("Unable to logout");
    }
  };

  return (
    <header className="w-full bg-black text-white border-b-4 border-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="bg-swiss-accent text-white px-2 py-1 text-xs font-black uppercase tracking-widest">
            SYSTEM
          </span>
          <Link
            className="text-lg font-black tracking-tighter uppercase text-white hover:text-swiss-accent transition-colors duration-150"
            to="/admin"
          >
            ADMIN CONSOLE
          </Link>
        </div>
        <button
          className="bg-white text-black font-bold uppercase text-xs tracking-widest px-4 py-2 border-2 border-white hover:bg-swiss-accent hover:text-white hover:border-swiss-accent transition-colors duration-150"
          onClick={handleLogout}
        >
          Exit Admin ←
        </button>
      </div>
    </header>
  );
}
