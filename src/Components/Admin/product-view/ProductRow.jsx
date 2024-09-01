import { useState } from "react";
import ProductFormModal from "./form/ProductFormModal";
import LoadingButton from "../../common/LoadingButton";
import { useDispatch } from "react-redux";
import PRODUCT_SERVICE from "../../../Firebase/productService";
import { removeSingleProductDetails } from "../../../redux/productSlice";
import { toast } from "react-toastify";

export default function ProductRow({ responseData }) {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleUpdateClick = () => {
    setShowUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };


  const handleConfirmDelete = async() =>{
      setLoading(true)
      const { docId, fileId, stripeProductId } = responseData
      try {
        console.log(docId, fileId)
        const result = await PRODUCT_SERVICE.deleteFile(fileId);
        if(result){
          await PRODUCT_SERVICE.deleteProductInStripe(stripeProductId);
          await PRODUCT_SERVICE.deleteProduct(docId);
          dispatch(removeSingleProductDetails(docId));
          toast.success("Product Deleted Successfully")
          setShowDeleteModal(false);
        }else{
          toast.warn("Unable to delete Product! Please try again later")
        }
      } catch (error) {
        console.log("error", error)
        toast.error("Something went wrong!")
      } finally {
        setLoading(false);
      }
    }

  return (
    <>
      <tr className="bg-white">
        <td>{responseData?.title}</td>
        <td>₹ {responseData?.price}</td>
        <td>{responseData?.productType}</td>
        {responseData?.status === 1 ? 
        <td className="badge text-green-500 gap-2">Available</td> :
        responseData?.status === 2 ?
        <td className="badge text-red-500 gap-2">Not Available</td> :
        <td className="badge text-blue-500 gap-2">Coming Soon</td> }
        <td>{responseData?.review}</td>
        <td className="flex gap-3">
          <button className="btn btn-success" onClick={handleUpdateClick}>
            Edit
          </button>
          <button className="btn btn-error" onClick={handleDeleteClick}>
            Delete
          </button>
        </td>
      </tr>

      {/* Update Modal */}
      {showUpdateModal && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <ProductFormModal
              editData={responseData}
              onClose={closeUpdateModal}
            />
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={closeUpdateModal}
            >
              ✕
            </button>
          </div>
        </dialog>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h2 className="font-bold text-lg text-red-600">Confirm Delete</h2>
            <p>Are you sure you want to delete this product?</p>
            <div className="modal-action">
              <LoadingButton
               className="btn btn-error" isLoading={loading} onClick={handleConfirmDelete}>
                Delete
              </LoadingButton>
              <button className="btn" onClick={closeDeleteModal}>
                Cancel
              </button>
            </div>
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={closeDeleteModal}
            >
              ✕
            </button>
          </div>
        </dialog>
      )}
    </>
  );
}
