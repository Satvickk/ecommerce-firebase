import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../common/Logo";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deleteAuth } from "../../redux/authSlice";
import AUTH_SERVICE from "../../Firebase/authService";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.Auth.isLogged);
  const userData = useSelector((state) => state.UserDetails)
  const UserCart = useSelector((state) => state.UserCart)

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
        toast.success("Logout Successfull ! see you soon");
        navigate("/");
      }
    } catch (error) {
      toast.error("Unable to logout");
    }
  };

  const PHONE_MENU_DATA = [
    {
      label: "Home",
      link: "/",
      svg: "/home.svg",
    },
    {
      label: "Wishlist",
      link: "/wishlist",
      svg: "/wishlist.svg",
    },
    {
      label: "My Orders",
      link: "/orders",
      svg: "/orders.svg",
    },
    {
      label: "Products",
      link: "/product",
      svg: "/product.svg",
    },
    {
      label: "Settings",
      link: "/settings",
      svg: "/setting.svg",
    },
  ];

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <Logo />
      </div>
      {isLoggedIn ? (
        <div className="hidden sm:flex navbar-end gap-4 mt-3 mr-3">

            {
              userData?.userRole == 2 && 
              <label
              className="btn btn-circle"
            >
              <Link rel="noopener noreferrer" to={'/admin'}>
                <img
                  src="/admin-login.svg"
                  alt="cart"
                  className="w-6 h-6 inline-block"
                />
              </Link>
            </label>
            }

          <div className="dropdown dropdown-hover dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost rounded-btn"
            >
              <img
                  src="/menu.svg"
                  alt="cart"
                  className="w-6 h-6 inline-block mr-2"
                />
              Menu
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content bg-base-100 rounded-box z-40 w-52 p-2 shadow"
            >
              {PHONE_MENU_DATA.map((item) => (
                <li key={item.label} className="text-start">
                  <NavLink
                    className={({ isActive }) =>
                      `btn rounded-md ${isActive ? "bg-black text-white" : ""}`
                    }
                    to={item.link}
                  >
                    <img
                      src={item.svg}
                      alt={item.label}
                      className="w-6 h-6 inline-block mr-2"
                    />
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li
                className="text-start btn rounded-md text-red-600"
                onClick={handleLogoutUser}
              >
                Logout
              </li>
            </ul>
          </div>

          <div className="indicator">
            {UserCart?.selectedProducts.length > 0 && <span className="indicator-item badge badge-secondary">{UserCart?.selectedProducts.length}</span>}
            <label
              className="btn drawer-button border-2 rounded-md"
              htmlFor="my-drawer-4"
            >
              <a rel="noopener noreferrer">
                <img
                  src="/cart.svg"
                  alt="cart"
                  className="w-6 h-6 inline-block mr-2"
                />
                Cart
              </a>
            </label>
          </div>
        </div>
      ) : (
        <div className="hidden sm:flex navbar-end gap-4 mt-3 mr-3">
          <NavLink className="btn rounded-md" to="/login">
            <img
              src="/login.svg"
              alt="login"
              className="w-6 h-6 inline-block mr-2"
            />
            Log in
          </NavLink>
          <NavLink className="btn rounded-md" to="/signup">
            <img
              src="/signup.svg"
              alt="signup"
              className="w-6 h-6 inline-block mr-2"
            />
            Sign up
          </NavLink>
        </div>
      )}
      <div className="flex sm:hidden navbar-end gap-4 mt-3 mr-3">
        <label
          className="z-40 btn btn-circle swap swap-rotate"
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          onClick={handleIsMenuOpen}
        >
          {/* this hidden checkbox controls the state */}
          <input
            type="checkbox"
            checked={isMenuOpen}
            onChange={handleIsMenuOpen}
          />

          {isMenuOpen ? (
            <svg
              className="swap-on fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
            </svg>
          ) : (
            <svg
              className="swap-off fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>
          )}
        </label>
      </div>
    </div>
  );
}
