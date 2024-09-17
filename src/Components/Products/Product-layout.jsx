import { useDispatch, useSelector } from "react-redux";
import FilterBox from "./FilterBox";
import ProductStripView from "./Product-strip-view";
import { useEffect } from "react";
import PRODUCT_SERVICE from "../../Firebase/productService";
import { setAllProductDetails } from "../../redux/productSlice";
import { toast } from "react-toastify";
import ComingSoon from "../common/ComingSoon";

export default function ProductLayout() {
  const dispatch = useDispatch();
  const AllProductsDetails = useSelector((state) => state.AllProductsDetails);

  useEffect(() => {
    if (AllProductsDetails.content.length === 0) {
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
          toast.error("Unable to fetch product details");
        }
      };

      // getAllProductsDetails();
      if (!AllProductsDetails.content.length > 0) {
        getAllProductsDetails();
      }
    }
  }, []);

  return (
    <>
      <h1 className="divider text-2xl sm:text-3xl my-8 font-normal">
        Products
      </h1>
      <div className="w-full p-4 grid sm:grid-cols-3">
        <div className="sm:col-span-1 bg-gray-200 p-4 rounded-md h-auto">
          <h1 className="divider divider-start text-md sm:text-xl my-8 font-normal">
            Filters
          </h1>
          {/* <FilterBox data={AllProductsDetails?.content} /> */}
          <ComingSoon />
        </div>
        <div className="sm:col-span-2 p-4 flex flex-col gap-6">
          {AllProductsDetails?.content.map((item, index) => (
            <ProductStripView key={index} data={item} />
          ))}
        </div>
      </div>
    </>
  );
}
