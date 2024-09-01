import { useState } from "react";
import LoadingButton from "../../common/LoadingButton";
import USER_SERVICE from "../../../Firebase/userService";
import { useDispatch } from "react-redux";
import { removeSingleUserDetails } from "../../../redux/allUserSlice";
import { toast } from "react-toastify";
import UpdateUserProfile from "./form/UpdateUserProfile";

export default function UserRow({responseData}) {
    
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
      <tr className="bg-white">
        <td>{responseData?.name}</td>
        <td>{responseData?.email}</td>
        <td>{responseData?.contact}</td>
        <td>{responseData?.password}</td>
        <td>{responseData?.pincode}</td>
        <td>{responseData?.address}</td>
        <td className="flex gap-3">
          <button className="btn btn-success" onClick={handleUpdateClick}>
            Edit
          </button>
          <button className="btn btn-error" onClick={handleDeleteClick}>
            Delete
          </button>
        </td>
      </tr>
      {showDeleteModal && <DeleteModal onClose={closeDeleteModal} id={responseData.docId} />}
      {showUpdateModal && <UpdateUserProfile onClose={closeUpdateModal} userData={responseData} />}
    </>
  );
}



export function DeleteModal({ onClose, id }) {

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleDeleteUserProfile = async(id) =>{
        setLoading(true)
        try {
          const result = await USER_SERVICE.deleteUser(id);
          if(result){
            dispatch(removeSingleUserDetails(id))
            toast.success("Account Deleted Successfully")
            onClose();
          }else{
            toast.warn("Unable to delete Account! Please try again later")
          }
        } catch (error) {
          console.log("error", error)
          toast.error("Something went wrong!")
        } finally {
          setLoading(false);
        }
      }

    return (
      <dialog open className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-red-600">Delete User</h3>
          <p className="py-4">
            Are you sure you want to delete user permanently?
          </p>
          <div className="modal-action">
            <LoadingButton className="btn btn-primary mr-1" isLoading={loading} onClick={() => handleDeleteUserProfile(id)}>
              Delete
            </LoadingButton>
            <button className="btn" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </dialog>
    );
  }
  