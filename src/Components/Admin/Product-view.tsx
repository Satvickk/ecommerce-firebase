import { useEffect } from "react";
import { toast } from "react-toastify";
import ProductRow from "./product-view/ProductRow";
import ProductFormModal from "./product-view/form/ProductFormModal";
import PRODUCT_SERVICE from "../../Firebase/productService";
import { setAllProductDetails } from "../../redux/productSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

export default function ProductView() {
  const dispatch = useAppDispatch();
  const AllProductsDetails = useAppSelector((state) => state.AllProductsDetails);

  useEffect(() => {
    const getAllProductsDetails = async () => {
      try {
        const ProductData = await PRODUCT_SERVICE.getProducts();
        dispatch(
          setAllProductDetails({
            content: ProductData,
            totalDoc: ProductData.length,
          })
        );
      } catch (error) {
        console.log("error:", error);
        toast.error("Unable to fetch user details");
      }
    };

    if (!AllProductsDetails?.content?.length) {
      getAllProductsDetails();
    }
  }, [AllProductsDetails?.content?.length, dispatch]);

  const handleOpenAddModal = () => {
    const modal = document.getElementById("add-modal") as HTMLDialogElement | null;
    if (modal) modal.showModal();
  };

  const handleCloseAddModal = () => {
    const modal = document.getElementById("add-modal") as HTMLDialogElement | null;
    if (modal) modal.close();
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b-4 border-black pb-4 gap-4">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-black">PRODUCT CATALOG MANAGEMENT</h2>
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block">TOTAL CATALOG ITEMS: {AllProductsDetails?.content?.length || 0}</span>
        </div>
        <button
          className="bg-black text-white font-black text-xs uppercase tracking-widest px-6 py-3 border-2 border-black hover:bg-swiss-accent hover:border-swiss-accent transition-colors duration-150 rounded-none"
          onClick={handleOpenAddModal}
        >
          ADD NEW PRODUCT +
        </button>
      </div>

      <dialog id="add-modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box border-4 border-black bg-white rounded-none p-0 max-w-2xl w-full">
          <div className="bg-black text-white p-4 border-b-4 border-black flex items-center justify-between">
            <h3 className="font-black text-sm uppercase tracking-widest text-swiss-accent">CREATE NEW PRODUCT ITEM</h3>
            <button onClick={handleCloseAddModal} className="text-white hover:text-swiss-accent font-black text-lg">✕</button>
          </div>
          <div className="p-6">
            <ProductFormModal
              editData={null}
              onClose={handleCloseAddModal}
            />
          </div>
        </div>
      </dialog>

      <div className="w-full border-4 border-black bg-white overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black text-white text-xs font-black uppercase tracking-widest border-b-4 border-black">
              <th className="p-4">IMAGE</th>
              <th className="p-4">TITLE</th>
              <th className="p-4">PRICE</th>
              <th className="p-4">CATEGORY</th>
              <th className="p-4">AVAILABILITY</th>
              <th className="p-4">REVIEW</th>
              <th className="p-4">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {AllProductsDetails?.content?.map((item) => (
              <ProductRow key={item.docId} responseData={item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
