import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const Header = React.lazy(() => import("../../Components/Header/Header"));
const Footer = React.lazy(() => import("../../Components/Footer/Footer"));

export default function Settings() {
  const USER_SETTINGS_TABS = [
    {
      label: "Profile",
      src: "",
    },
    {
      label: "Update Profile",
      src: "update",
    },
  ];

  const location = useLocation();

  return (
    <div className="layout-desktop-container">
      <Header />
      <div className="layout-desktop-item-grow">
        <h1 className="divider text-2xl sm:text-3xl my-8 font-normal text-center">
          Settings
        </h1>
        <div className="flex-grow w-full p-4 grid sm:grid-cols-4 gap-4">
          <div className="sm:col-span-1 bg-gray-200 p-4 rounded-md h-auto flex flex-col gap-3">
            <h1 className="divider divider-start text-2xl sm:text-2xl my-8 font-normal">
              Options
            </h1>
            {USER_SETTINGS_TABS.map((item) => (
              <NavLink
                key={item.label}
                className={({ isActive }) =>
                  `btn ${isActive ? "btn-primary" : "btn-ghost"}`
                }
                to={item.src}
                end
                isActive={() =>
                  location.pathname ===
                  `/settings${item.src ? `/${item.src}` : ""}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <button
              className="btn border-2 text-red-600"
              onClick={() => document.getElementById("delete-modal").showModal()}
            >
              Delete Account
            </button>
          </div>
          <div className="sm:col-span-3 bg-gray-200 p-4 rounded-md h-auto flex flex-col gap-3">
            <Outlet />
          </div>
        </div>
      </div>
      <DeleteModal />
      <Footer />
    </div>
  );
}

export function DeleteModal() {
  return (
    <dialog id="delete-modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-red-600">Delete Account!</h3>
        <p className="py-4">Are you sure you want to delete your account permanently?</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-primary mr-4">Delete</button>
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
