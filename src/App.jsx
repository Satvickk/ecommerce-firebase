import { NavLink, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import RoutesLayout from "./lib/RoutesLayout";


const CartCard = React.lazy(() => import("./Components/Cart/Cart-card"));

function App() {
  const PHONE_MENU_DATA = [
    {
      label: "Home",
      link: "/",
      svg: "/home.svg",
      loggedIn: false,
    },
    {
      label: "Home",
      link: "/",
      svg: "/home.svg",
      loggedIn: true,
    },
    {
      label: "Login",
      link: "/login",
      svg: "/login.svg",
      loggedIn: false,
    },
    {
      label: "Sign Up",
      link: "/signup",
      svg: "/signup.svg",
      loggedIn: false,
    },
    {
      label: "Cart",
      link: "/cart",
      svg: "/cart.svg",
      loggedIn: true,
    },
    {
      label: "My Order",
      link: "/orders",
      svg: "/orders.svg",
      loggedIn: true,
    },
    {
      label: "Wishlist",
      link: "/wishlist",
      svg: "/wishlist.svg",
      loggedIn: true,
    },
    {
      label: "Product",
      link: "/product",
      svg: "/product.svg",
      loggedIn: true,
    },
    {
      label: "Settings",
      link: "/settings",
      svg: "/setting.svg",
      loggedIn: true,
    },
  ];

  const CART_PRODUCTS_DATA = [
    {
      imageUrl: '/product1.jpg',
      title: "Boat Headphone 2",
      price: 200
    },
    {
      imageUrl: '/product1.jpg',
      title: "Boat Headphone 2",
      price: 200
    },
    {
      imageUrl: '/product1.jpg',
      title: "Boat Headphone 2",
      price: 200
    },
    {
      imageUrl: '/product1.jpg',
      title: "Boat Headphone 2",
      price: 200
    },
    {
      imageUrl: '/product1.jpg',
      title: "Boat Headphone 2",
      price: 200
    },
    {
      imageUrl: '/product1.jpg',
      title: "Boat Headphone 2",
      price: 200
    },
  ]

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Close the drawer on navigation
    document.getElementById("my-drawer-4").checked = false;
  }, [location]);

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <RoutesLayout />
      </div>
      <div className="drawer-side z-30">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="hidden sm:block menu bg-base-200 text-base-content min-h-full w-[500px] p-4">
          <h1 className="divider text-md sm:text-xl my-8 font-medium">
            Cart
            <img
              src={"/cart.svg"}
              alt={"cart"}
              className="w-6 h-6 inline-block"
            />
          </h1>
          <div className="flex flex-col gap-4">
            {
              CART_PRODUCTS_DATA.map((item, index) => 
              <CartCard 
              key={index}
              imageUrl={item.imageUrl}
              title={item.title}
              price={item.price}
              />
            )
            }
          </div>
          <button className="btn btn-primary w-full my-4" 
          onClick={() => navigate('/payment')}
          >Checkout</button>
        </ul>

        <ul className="sm:hidden flex gap-4 z-10 pt-12 relative menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {isLoggedIn
            ? PHONE_MENU_DATA.filter((item) => item.loggedIn === true).map(
                (item) => (
                  <li
                    className={({ isActive }) =>
                      `phone-drawer-menu-btn ${
                        isActive && `bg-black text-white`
                      }`
                    }
                    key={item.label}
                  >
                    <NavLink to={item.link}>
                      <img
                        src={item.svg}
                        alt={item.label}
                        className="w-6 h-6 inline-block mr-2"
                      />
                      {item.label}
                    </NavLink>
                  </li>
                )
              )
            : PHONE_MENU_DATA.filter((item) => item.loggedIn === false).map(
                (item) => (
                  <li
                    className={({ isActive }) =>
                      `phone-drawer-menu-btn ${
                        isActive && `bg-black text-white`
                      }`
                    }
                    key={item.label}
                  >
                    <NavLink to={item.link}>
                      <img
                        src={item.svg}
                        alt={item.label}
                        className="w-6 h-6 inline-block mr-2"
                      />
                      {item.label}
                    </NavLink>
                  </li>
                )
              )}
        </ul>
      </div>
    </div>
  );
}

export default App;
