import { Outlet } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import AdminHeader from "../../Components/Header/Admin-Header";
import SideBar from "../../Components/Admin/SideBar";

export default function AdminLayout() {
  const USER_SETTINGS_TABS = [
    { label: "Users List", src: "/admin" },
    { label: "Products Catalog", src: "adminProducts" },
    { label: "Orders Database", src: "adminOrders" },
    { label: "Admin Profile", src: "adminProfile" },
  ];

  return (
    <div className="layout-desktop-container">
      <AdminHeader />
      <div className="layout-desktop-item-grow bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Admin Navigation */}
            <div className="lg:col-span-3 border-4 border-black bg-swiss-muted p-6">
              <SideBar tabs={USER_SETTINGS_TABS} />
            </div>

            {/* Right Column: Dynamic Panel */}
            <div className="lg:col-span-9 border-4 border-black bg-white p-6 sm:p-8">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
