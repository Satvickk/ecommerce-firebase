import { useEffect, useState } from "react";
import ProductStripView from "./Product-strip-view";
import PRODUCT_SERVICE from "../../Firebase/productService";
import { setAllProductDetails } from "../../redux/productSlice";
import { toast } from "react-toastify";
import FilterBox from "./FilterBox";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
export default function ProductLayout() {
  const dispatch = useAppDispatch();
  const AllProductsDetails = useAppSelector((state) => state.AllProductsDetails);
  const [initialData, setInitialData] = useState([]);
  useEffect(() => {
    const getAllProductsDetails = async () => {
      try {
        const ProductData = await PRODUCT_SERVICE.getProducts();
        setInitialData(ProductData);
        dispatch(
          setAllProductDetails({
            content: ProductData,
            totalDoc: ProductData.length
          })
        );
      } catch (error) {
        console.log("error:", error);
        toast.error("Unable to fetch product details");
      }
    };
    if (AllProductsDetails.content.length === 0) {
      getAllProductsDetails();
    } else {
      setInitialData(AllProductsDetails.content);
    }
  }, [AllProductsDetails.content.length, dispatch]);
  return <section className="w-full bg-white border-b-4 border-black py-16"><div className="max-w-7xl mx-auto px-4 sm:px-8"><div className="flex items-center gap-4 mb-8 pb-4 border-b-4 border-black"><span className="bg-swiss-accent text-white px-3 py-1 text-xs font-black uppercase tracking-widest">
            CATALOG ARCHITECTURE
          </span><h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter text-black">
            ALL HARDWARE PRODUCTS
          </h1></div><div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">{
    /* Left Column: Filter Sidebar */
  }<div className="lg:col-span-4 border-4 border-black bg-swiss-muted p-6 sticky top-24"><h3 className="text-sm font-black uppercase tracking-widest text-black border-b-2 border-black pb-3 mb-6">
              01. FILTER SPECIFICATIONS
            </h3><FilterBox data={initialData} /></div>{
    /* Right Column: Product Cards */
  }<div className="lg:col-span-8 space-y-6">{AllProductsDetails?.content.map((item, index) => <ProductStripView key={item.docId || index} data={item} />)}</div></div></div></section>;
}
