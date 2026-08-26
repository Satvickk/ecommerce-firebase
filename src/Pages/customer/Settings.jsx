import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import LoadingButton from "../../Components/common/LoadingButton";
import { useState } from "react";
import { toast } from "react-toastify";
import USER_SERVICE from "../../Firebase/userService";
import { removeUserDetails } from "../../redux/userDetailSlice";
import { deleteAuth } from "../../redux/authSlice";
import { useUserDetails } from "../../lib/hooks/GetDetailsHooks";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
export default function Settings() {
  const USER_SETTINGS_TABS = [
    { label: "Profile", src: "" },
    { label: "Update Profile", src: "update" }
  ];
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useUserDetails();
  const UserDetails = useAppSelector((state) => state.UserDetails);
  const [loading, setLoading] = useState(false);
  const handleDeleteUserProfile = async () => {
    const id = UserDetails?.docId;
    if (!id) return;
    setLoading(true);
    try {
      const result = await USER_SERVICE.deleteUser(id);
      if (result) {
        dispatch(removeUserDetails());
        dispatch(deleteAuth());
        toast.success("Account Deleted Successfully");
        navigate("/");
      } else {
        toast.warn("Unable to delete Account! Please try again later");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  return <div className="layout-desktop-container"><Header /><div className="layout-desktop-item-grow bg-white py-12"><div className="max-w-7xl mx-auto px-4 sm:px-8"><div className="flex items-center gap-4 mb-8 pb-4 border-b-4 border-black"><span className="bg-swiss-accent text-white px-3 py-1 text-xs font-black uppercase tracking-widest">
              05. ACCOUNT PREFERENCES
            </span><h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-black">
              SETTINGS & PROFILE
            </h1></div><div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">{
    /* Sidebar Navigation */
  }<div className="lg:col-span-4 border-4 border-black bg-swiss-muted p-6 space-y-4"><h3 className="text-sm font-black uppercase tracking-widest text-black border-b-2 border-black pb-3">
                01. NAVIGATION
              </h3><div className="flex flex-col gap-2">{USER_SETTINGS_TABS.map((item) => <NavLink
    key={item.label}
    className={({ isActive }) => `w-full text-left px-4 py-3 text-xs font-black uppercase tracking-widest border-2 border-black transition-colors duration-150 ${isActive ? "bg-black text-white" : "bg-white text-black hover:bg-black hover:text-white"}`}
    to={item.src}
    end
  >{item.label}</NavLink>)}<button
    className="w-full text-left px-4 py-3 text-xs font-black uppercase tracking-widest bg-swiss-accent text-white border-2 border-swiss-accent hover:bg-black hover:border-black transition-colors duration-150 mt-4"
    onClick={() => {
      const modal = document.getElementById("delete-modal");
      if (modal) modal.showModal();
    }}
  >
                  DELETE ACCOUNT ✕
                </button></div></div>{
    /* Main Content */
  }<div className="lg:col-span-8 border-4 border-black bg-white p-8"><Outlet /></div></div></div></div><DeleteModal
    handleDeleteUserProfile={handleDeleteUserProfile}
    loading={loading}
  /><Footer /></div>;
}
export function DeleteModal({ loading, handleDeleteUserProfile }) {
  return <dialog id="delete-modal" className="modal modal-bottom sm:modal-middle"><div className="modal-box border-4 border-black bg-white rounded-none p-0 max-w-md w-full"><div className="bg-black text-white p-4 border-b-4 border-black"><h3 className="font-black text-sm uppercase tracking-widest text-swiss-accent">DELETE ACCOUNT CONFIRMATION</h3></div><div className="p-6 space-y-4"><p className="text-xs font-bold uppercase tracking-wider text-black leading-relaxed border-l-4 border-swiss-accent pl-3">
            PERMANENTLY DELETE YOUR USER ACCOUNT? ALL STORED PROFILE DATA AND HISTORY WILL BE ERASED.
          </p><div className="flex flex-col gap-3 pt-4 border-t-2 border-black"><LoadingButton
    isLoading={loading}
    className="w-full bg-swiss-accent text-white border-2 border-swiss-accent font-black text-xs uppercase tracking-widest hover:bg-black hover:border-black transition-colors duration-150 py-3"
    onClick={() => handleDeleteUserProfile()}
  >
              CONFIRM DELETE PERMANENTLY
            </LoadingButton><form method="dialog" className="w-full"><button className="w-full bg-white text-black font-black text-xs uppercase tracking-widest py-3 border-2 border-black hover:bg-swiss-muted transition-colors duration-150">
                CANCEL
              </button></form></div></div></div></dialog>;
}
