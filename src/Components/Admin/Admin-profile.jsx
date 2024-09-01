import { useSelector } from "react-redux";
import UpdateProfile from "../Settings/UpdateProfile";

export default function UserProfile() {

  const userData = useSelector((state) => state?.UserDetails);

  return (
    <div>
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl sm:text-2xl font-normal">Profile</h1>
        <UpdateModal />
      </div>
      <div className="divider"></div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <label htmlFor="name" className="font-medium">
            Name:
          </label>
          <p id="name" >{userData?.name}</p>

        </div>
        <div className="flex gap-3">
          <label htmlFor="email" className="font-medium">
            Email:
          </label>
          <p id="email" >{userData?.email}</p>
        </div>
        <div className="flex gap-3">
          <label htmlFor="address" className="font-medium">
            House Address:
          </label>
          <p id="address" >{userData?.address}</p>
        </div>
        <div className="flex gap-3">
          <label htmlFor="address" className="font-medium">
            Pin Code:
          </label>
          <p id="pincode">{userData?.pincode}</p>
        </div>
        <div className="flex gap-3">
          <label htmlFor="contact" className="font-medium">
            Contact Number:
          </label>
          <p id="contact" >{userData?.contact}</p>
        </div>
        <div className="flex gap-3">
          <label htmlFor="password" className="font-medium">
            Password:
          </label>
          <p id="password" >{userData?.password}</p>
        </div>
      </div>
    </div>
  );
}

export function UpdateModal() {
  return (
    <>
      <button
        className="btn btn-success"
        onClick={() => document.getElementById("my_modal_4").showModal()}
      >
        Update
      </button>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
        <UpdateProfile handleClose={() => document.getElementById("my_modal_4").close()}/>
        </div>
      </dialog>
    </>
  );
}
