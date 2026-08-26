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
    { label: "Update Profile", src: "update" },
  ];

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useUserDetails();
  const UserDetails = useAppSelector((state) => state.UserDetails);

  const [loading, setLoading] = useState<boolean>(false);

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
              >
                {item.label}
              </NavLink>
            ))}
            <button
              className="btn border-2 text-red-600"
              onClick={() => {
                const modal = document.getElementById("delete-modal") as HTMLDialogElement | null;
                if (modal) modal.showModal();
              }}
            >
              Delete Account
            </button>
          </div>
          <div className="sm:col-span-3 bg-gray-200 p-4 rounded-md h-auto flex flex-col gap-3">
            <Outlet />
          </div>
        </div>
      </div>
      <DeleteModal
        handleDeleteUserProfile={handleDeleteUserProfile}
        loading={loading}
      />
      <Footer />
    </div>
  );
}

interface DeleteModalProps {
  loading: boolean;
  handleDeleteUserProfile: () => void;
}

export function DeleteModal({ loading, handleDeleteUserProfile }: DeleteModalProps) {
  return (
    <dialog id="delete-modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-red-600">Delete Account!</h3>
        <p className="py-4">Are you sure you want to delete your account permanently? <br/> All your Data will be lost! </p>
        <div className="modal-action">
          <form method="dialog">
            <LoadingButton className="mr-4" isLoading={loading} onClick={() => handleDeleteUserProfile()}>
              Delete
            </LoadingButton>
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
