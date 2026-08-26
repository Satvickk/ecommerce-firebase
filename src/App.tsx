import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import RoutesLayout from "./lib/RoutesLayout";
import Toast from "./Components/common/Toast";
import AUTH_SERVICE from "./Firebase/authService";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { deleteAuth, setAuth } from "./redux/authSlice";
import { useUserDetails } from "./lib/hooks/GetDetailsHooks";
import { toast } from "react-toastify";
import { removeUserDetails } from "./redux/userDetailSlice";
import CartDesktopManage from "./Components/Cart/cart-desktop-manage";

function App() {
  const PHONE_MENU_DATA = [
    { label: "Home", link: "/", svg: "/home.svg", loggedIn: false },
    { label: "Home", link: "/", svg: "/home.svg", loggedIn: true },
    { label: "Login", link: "/login", svg: "/login.svg", loggedIn: false },
    { label: "Sign Up", link: "/signup", svg: "/signup.svg", loggedIn: false },
    { label: "Cart", link: "/cart", svg: "/cart.svg", loggedIn: true },
    { label: "My Order", link: "/orders", svg: "/orders.svg", loggedIn: true },
    { label: "Wishlist", link: "/wishlist", svg: "/wishlist.svg", loggedIn: true },
    { label: "Product", link: "/product", svg: "/product.svg", loggedIn: true },
    { label: "Settings", link: "/settings", svg: "/setting.svg", loggedIn: true },
  ];

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const Auth = useAppSelector((state) => state.Auth);
  const isLoggedIn = useAppSelector((state) => state.Auth?.isLogged);
  const userData = useAppSelector((state) => state.UserDetails);

  useEffect(() => {
    const drawer = document.getElementById("my-drawer-4") as HTMLInputElement | null;
    if (drawer) drawer.checked = false;
  }, [location]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const resp: any = await AUTH_SERVICE.getCurrentUser();
        if (resp) {
          const { uid, displayName, email } = resp;
          dispatch(
            setAuth({
              userId: uid,
              userName: displayName,
              userEmail: email,
              isLogged: true,
            })
          );
          window.localStorage.setItem("authToken", resp.accessToken || "");
        }
      } catch (error) {
        console.log("Error fetching user details:", error);
      }
    };

    if (!Auth?.userId) {
      fetchUserDetails();
    }
  }, [Auth?.userId, dispatch]);

  useUserDetails();

  const handleLogoutUser = async () => {
    try {
      const resp = await AUTH_SERVICE.logout();
      if (resp) {
        dispatch(deleteAuth());
        dispatch(removeUserDetails());
        window.localStorage.removeItem("authToken");
        toast.success("Logout Successfull ! see you soon");
        navigate("/");
      }
    } catch (error) {
      toast.error("Unable to logout");
    }
  };

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <RoutesLayout />
      </div>
      <Toast />
      <div className="drawer-side z-30">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="hidden sm:block menu bg-base-200 text-base-content min-h-full w-[500px] p-4">
          <CartDesktopManage />
        </ul>

        <ul className="sm:hidden flex gap-4 z-10 pt-12 relative menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {(Auth?.isLogged
            ? PHONE_MENU_DATA.filter((item) => item.loggedIn === true)
            : PHONE_MENU_DATA.filter((item) => item.loggedIn === false)
          ).map((item, index) => (
            <li key={`${item.label}-${item.link}-${index}`}>
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  `phone-drawer-menu-btn ${
                    isActive ? "bg-black text-white" : ""
                  }`
                }
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

          {userData?.userRole === 2 && isLoggedIn && (
            <li>
              <NavLink
                to={"/admin"}
                className={({ isActive }) =>
                  `phone-drawer-menu-btn ${
                    isActive ? "bg-black text-white" : ""
                  }`
                }
              >
                <img
                  src="/admin-login.svg"
                  alt="admin"
                  className="w-6 h-6 mr-2 inline-block"
                />
                Admin
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li
              className="phone-drawer-menu-btn text-red-600 text-center"
              onClick={handleLogoutUser}
            >
              Logout
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
