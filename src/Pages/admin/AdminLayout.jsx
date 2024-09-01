import { Outlet } from "react-router-dom";

import Footer from "../../Components/Footer/Footer";
import AdminHeader from "../../Components/Header/Admin-Header"
import SideBar from "../../Components/Admin/SideBar"

export default function AdminLayout() {
  const USER_SETTINGS_TABS = [
    {
      label: "Users",
      src: "/admin",
    },
    {
      label: "Products",
      src: "adminProducts",
    },
    {
      label: "Orders",
      src: "adminOrders",
    },
    {
      label: "Profile",
      src: "adminProfile",
    },
  ];

  return (
    <div className="layout-desktop-container">
      <AdminHeader />
      <div className="layout-desktop-item-grow">
        <div className="w-full p-4 grid sm:grid-cols-4 gap-4">
          <div className="sm:col-span-1 bg-gray-200 p-4 rounded-md h-auto flex flex-col gap-3">
            <SideBar 
            tabs={USER_SETTINGS_TABS}
            />
          </div>
          <div className="sm:col-span-3 bg-gray-200 p-4 rounded-md h-auto flex flex-col gap-3">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}