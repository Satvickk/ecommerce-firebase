import { useState } from "react";
import ProductFormModal from "./form/ProductFormModal";
import LoadingButton from "../../common/LoadingButton";
import PRODUCT_SERVICE from "../../../Firebase/productService";
import { removeSingleProductDetails } from "../../../redux/productSlice";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../redux/hooks";
import { Product } from "../../../types";

interface ProductRowProps {
  responseData: Product;
}

export default function ProductRow({ responseData }: ProductRowProps) {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

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

  const handleConfirmDelete = async () => {
    setLoading(true);
    const { docId, fileId, stripeProductId } = responseData;
    try {
      if (fileId && docId) {
        const result = await PRODUCT_SERVICE.deleteFile(fileId);
        if (result) {
          if (stripeProductId) {
            await PRODUCT_SERVICE.deleteProductInStripe(stripeProductId);
          }
          await PRODUCT_SERVICE.deleteProduct(docId);
          dispatch(removeSingleProductDetails(docId));
          toast.success("Product Deleted Successfully");
          setShowDeleteModal(false);
        } else {
          toast.warn("Unable to delete Product! Please try again later");
        }
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <tr className="border-b border-black last:border-b-0 hover:bg-swiss-muted text-xs font-bold uppercase tracking-wider text-black">
        <td className="p-4">
          <div className="w-10 h-10 border border-black bg-white p-0.5 shrink-0 flex items-center justify-center">
            <img src={responseData?.featuredImage} alt="product" className="max-h-full object-contain" />
          </div>
        </td>

        <td className="p-4 font-black">{responseData?.title}</td>

        <td className="p-4 font-black text-black">₹ {responseData?.price}</td>

        <td className="p-4">{responseData?.productType}</td>

        <td className="p-4">
          {responseData?.status === 1 ? (
            <span className="bg-black text-white text-[10px] font-black px-2 py-0.5 uppercase tracking-widest border border-black">AVAILABLE</span>
          ) : responseData?.status === 2 ? (
            <span className="bg-swiss-accent text-white text-[10px] font-black px-2 py-0.5 uppercase tracking-widest">NOT AVAILABLE</span>
          ) : (
            <span className="bg-white text-black border border-black text-[10px] font-black px-2 py-0.5 uppercase tracking-widest">COMING SOON</span>
          )}
        </td>

        <td className="p-4 font-black">★ {responseData?.review || 4.5}</td>

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

      {/* Update Modal */}
      {showUpdateModal && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box border-4 border-black bg-white rounded-none p-0 max-w-2xl w-full">
            <div className="bg-black text-white p-4 border-b-4 border-black flex items-center justify-between">
              <h3 className="font-black text-sm uppercase tracking-widest text-swiss-accent">EDIT PRODUCT SPECIFICATION</h3>
              <button onClick={closeUpdateModal} className="text-white hover:text-swiss-accent font-black text-lg">✕</button>
            </div>
            <div className="p-6">
              <ProductFormModal
                editData={responseData}
                onClose={closeUpdateModal}
              />
            </div>
          </div>
        </dialog>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box border-4 border-black bg-white rounded-none p-0 max-w-md w-full">
            <div className="bg-black text-white p-4 border-b-4 border-black flex items-center justify-between">
              <h3 className="font-black text-sm uppercase tracking-widest text-swiss-accent">CONFIRM PRODUCT DELETION</h3>
              <button onClick={closeDeleteModal} className="text-white hover:text-swiss-accent font-black text-lg">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-xs font-bold uppercase tracking-wider text-black leading-relaxed border-l-4 border-swiss-accent pl-3">
                ARE YOU SURE YOU WANT TO PERMANENTLY REMOVE THIS PRODUCT FROM CATALOG & STRIPE?
              </p>
              <div className="flex flex-col gap-3 pt-4 border-t-2 border-black">
                <LoadingButton
                  className="w-full bg-swiss-accent text-white border-2 border-swiss-accent font-black text-xs uppercase tracking-widest py-3"
                  isLoading={loading}
                  onClick={handleConfirmDelete}
                >
                  DELETE PRODUCT NOW
                </LoadingButton>
                <button className="w-full bg-white text-black font-black text-xs uppercase tracking-widest py-3 border-2 border-black hover:bg-swiss-muted" onClick={closeDeleteModal}>
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}
