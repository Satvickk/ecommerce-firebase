import { useState } from "react";
import LoadingButton from "../../common/LoadingButton";
import USER_SERVICE from "../../../Firebase/userService";
import { removeSingleUserDetails } from "../../../redux/allUserSlice";
import { toast } from "react-toastify";
import UpdateUserProfile from "./form/UpdateUserProfile";
import { useAppDispatch } from "../../../redux/hooks";
import { UserProfile } from "../../../types";

interface UserRowProps {
  responseData: UserProfile;
}

export default function UserRow({ responseData }: UserRowProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleUpdateClick = () => {
    setShowUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setShowUpdateModal(false);
  };

  return (
    <>
      <tr className="border-b border-black last:border-b-0 hover:bg-swiss-muted text-xs font-bold uppercase tracking-wider text-black">
        <td className="p-4 font-black">{responseData?.name}</td>
        <td className="p-4">{responseData?.email}</td>
        <td className="p-4">{responseData?.contact}</td>
        <td className="p-4 font-mono text-[10px]">••••••••</td>
        <td className="p-4">{responseData?.pincode}</td>
        <td className="p-4">{responseData?.address}</td>
        <td className="p-4 flex gap-2">
          <button
            className="bg-black text-white px-3 py-1.5 text-[10px] font-black uppercase tracking-widest border border-black hover:bg-swiss-accent transition-colors duration-150 rounded-none"
            onClick={handleUpdateClick}
          >
            EDIT
          </button>
          <button
            className="bg-swiss-accent text-white px-3 py-1.5 text-[10px] font-black uppercase tracking-widest border border-swiss-accent hover:bg-black hover:border-black transition-colors duration-150 rounded-none"
            onClick={handleDeleteClick}
          >
            DELETE
          </button>
        </td>
      </tr>
      {showDeleteModal && responseData?.docId && <DeleteModal onClose={closeDeleteModal} id={responseData.docId} />}
      {showUpdateModal && <UpdateUserProfile onClose={closeUpdateModal} userData={responseData} />}
    </>
  );
}

interface DeleteModalProps {
  onClose: () => void;
  id: string;
}

export function DeleteModal({ onClose, id }: DeleteModalProps) {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleDeleteUserProfile = async (id: string) => {
    setLoading(true);
    try {
      const result = await USER_SERVICE.deleteUser(id);
      if (result) {
        dispatch(removeSingleUserDetails(id));
        toast.success("Account Deleted Successfully");
        onClose();
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
    <dialog open className="modal modal-bottom sm:modal-middle">
      <div className="modal-box border-4 border-black bg-white rounded-none p-0 max-w-md w-full">
        <div className="bg-black text-white p-4 border-b-4 border-black">
          <h3 className="font-black text-sm uppercase tracking-widest text-swiss-accent">DELETE USER ACCOUNT</h3>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-xs font-bold uppercase tracking-wider text-black leading-relaxed border-l-4 border-swiss-accent pl-3">
            PERMANENTLY ERASE THIS USER PROFILE AND ASSOCIATED SYSTEM RECORDS?
          </p>
          <div className="flex flex-col gap-3 pt-4 border-t-2 border-black">
            <LoadingButton
              isLoading={loading}
              className="w-full bg-swiss-accent text-white border-2 border-swiss-accent font-black text-xs uppercase tracking-widest py-3"
              onClick={() => handleDeleteUserProfile(id)}
            >
              CONFIRM DELETE
            </LoadingButton>
            <button className="w-full bg-white text-black font-black text-xs uppercase tracking-widest py-3 border-2 border-black hover:bg-swiss-muted" onClick={onClose}>
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
