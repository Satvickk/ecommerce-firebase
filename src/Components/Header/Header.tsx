import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import Logo from "../common/Logo";
import { useState } from "react";
import { toast } from "react-toastify";
import { deleteAuth } from "../../redux/authSlice";
import AUTH_SERVICE from "../../Firebase/authService";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import type { RootState } from "../../redux/store/store";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = useAppSelector((state: RootState) => state.Auth.isLogged);
  const userData = useAppSelector((state: RootState) => state.UserDetails);
  const UserCart = useAppSelector((state: RootState) => state.UserCart);

  function handleIsMenuOpen() {
    setIsMenuOpen(!isMenuOpen);
  }

  const handleLogoutUser = async () => {
    try {
      const resp = await AUTH_SERVICE.logout();
      if (resp) {
        dispatch(deleteAuth());
        window.localStorage.removeItem("authToken");
        window.localStorage.removeItem("role");
        toast.success("Logout Successful! See you soon");
        navigate("/");
      }
    } catch (error) {
      toast.error("Unable to logout");
    }
  };

  const PHONE_MENU_DATA = [
    { label: "Home", link: "/", svg: "/home.svg" },
    { label: "Wishlist", link: "/wishlist", svg: "/wishlist.svg" },
    { label: "My Orders", link: "/orders", svg: "/orders.svg" },
    { label: "Products", link: "/product", svg: "/product.svg" },
    { label: "Settings", link: "/settings", svg: "/setting.svg" },
  ];

  return (
    <header className="w-full bg-white border-b-4 border-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Logo />
          {/* Main Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 ml-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-xs font-bold uppercase tracking-widest px-3 py-2 transition-colors duration-150 ${
                  isActive ? "bg-black text-white" : "text-black hover:bg-swiss-muted"
                }`
              }
            >
              01. Home
            </NavLink>
            <NavLink
              to="/product"
              className={({ isActive }) =>
                `text-xs font-bold uppercase tracking-widest px-3 py-2 transition-colors duration-150 ${
                  isActive ? "bg-black text-white" : "text-black hover:bg-swiss-muted"
                }`
              }
            >
              02. Products
            </NavLink>
            {isLoggedIn && (
              <>
                <NavLink
                  to="/wishlist"
                  className={({ isActive }) =>
                    `text-xs font-bold uppercase tracking-widest px-3 py-2 transition-colors duration-150 ${
                      isActive ? "bg-black text-white" : "text-black hover:bg-swiss-muted"
                    }`
                  }
                >
                  03. Wishlist
                </NavLink>
                <NavLink
                  to="/orders"
                  className={({ isActive }) =>
                    `text-xs font-bold uppercase tracking-widest px-3 py-2 transition-colors duration-150 ${
                      isActive ? "bg-black text-white" : "text-black hover:bg-swiss-muted"
                    }`
                  }
                >
                  04. Orders
                </NavLink>
              </>
            )}
          </nav>
        </div>

        {/* Right Action Items */}
        {isLoggedIn ? (
          <div className="hidden sm:flex items-center gap-3">
            {userData?.userRole === 2 && (
              <Link
                to="/admin"
                className="bg-swiss-muted text-black border-2 border-black font-bold uppercase text-xs tracking-widest px-4 py-2 hover:bg-black hover:text-white transition-colors duration-150"
              >
                Admin Console
              </Link>
            )}

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="bg-white text-black border-2 border-black font-bold uppercase text-xs tracking-widest px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-swiss-muted transition-colors duration-150"
              >
                <span>Menu</span>
                <span className="text-swiss-accent font-black">↓</span>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content border-2 border-black bg-white z-50 w-56 p-0 mt-1 shadow-none rounded-none"
              >
                {PHONE_MENU_DATA.map((item) => (
                  <li key={item.label} className="border-b border-black last:border-b-0">
                    <NavLink
                      className={({ isActive }) =>
                        `block px-4 py-3 text-xs font-bold uppercase tracking-widest transition-colors duration-150 ${
                          isActive
                            ? "bg-black text-white"
                            : "text-black hover:bg-swiss-accent hover:text-white"
                        }`
                      }
                      to={item.link}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
                <li className="border-t-2 border-black">
                  <button
                    className="w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-widest bg-swiss-accent text-white hover:bg-black transition-colors duration-150"
                    onClick={handleLogoutUser}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>

            <label
              htmlFor="my-drawer-4"
              className="bg-black text-white border-2 border-black font-bold uppercase text-xs tracking-widest px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-swiss-accent transition-colors duration-150"
            >
              <span>Cart</span>
              {UserCart?.selectedProducts?.length > 0 && (
                <span className="bg-swiss-accent text-white px-2 py-0.5 text-[10px] font-black border border-white">
                  {UserCart?.selectedProducts.length}
                </span>
              )}
            </label>
          </div>
        ) : (
          <div className="hidden sm:flex items-center gap-3">
            <NavLink
              to="/login"
              className="bg-white text-black border-2 border-black font-bold uppercase text-xs tracking-widest px-5 py-2.5 hover:bg-black hover:text-white transition-colors duration-150"
            >
              Log In
            </NavLink>
            <NavLink
              to="/signup"
              className="bg-black text-white border-2 border-black font-bold uppercase text-xs tracking-widest px-5 py-2.5 hover:bg-swiss-accent hover:border-swiss-accent transition-colors duration-150"
            >
              Sign Up
            </NavLink>
          </div>
        )}

        {/* Mobile Toggle Button */}
        <div className="flex sm:hidden items-center gap-3">
          <label
            htmlFor="my-drawer-4"
            className="border-2 border-black bg-black text-white p-2 text-xs font-bold uppercase tracking-wider cursor-pointer"
            onClick={handleIsMenuOpen}
          >
            {isMenuOpen ? "CLOSE" : "MENU"}
          </label>
        </div>
      </div>
    </header>
  );
}
