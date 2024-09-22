import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ProductRow from "./product-view/ProductRow";
import ProductFormModal from "./product-view/form/ProductFormModal";
import PRODUCT_SERVICE from "../../Firebase/productService";
import { setAllProductDetails } from "../../redux/productSlice";

export default function ProductView() {
  const dispatch = useDispatch();
  const AllProductsDetails = useSelector((state) => state.AllProductsDetails);

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

    if (!AllProductsDetails.content.length > 0) {
      getAllProductsDetails();
    }
  }, []);
  

  return (
    <div className="text-center w-full min-h-screen flex justify-center items-center flex-col gap-8 p-2 sm:p-12 flex-grow overflow-x-scroll sm:h-auto relative sm:static">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
        <h1 className="divider divider-start hidden sm:block text-2xl sm:text-3xl font-normal">
          Products
        </h1>
        <button
          className="btn btn-info rounded-md text-white font-bold"
          onClick={() => document.getElementById("add-modal").showModal()}
        >
          Add +
        </button>
      </div>
      <dialog id="add-modal" className="modal">
        <div className="modal-box">
          <ProductFormModal
            editData={null}
            onClose={() => document.getElementById("add-modal").close()}
          />
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => document.getElementById("add-modal").close()}
          >
            ✕
          </button>
        </div>
      </dialog>
      <div className="py-4 w-full sm:static absolute left-0 top-0">
        <table className="table w-full">
          <thead>
            <tr className="bg-black text-white">
              <th></th>
              <th>Product</th>
              <th>Price (&#8377;)</th>
              <th>Product Type</th>
              <th>Status</th>
              <th>Reviews</th>
              <th></th>
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
