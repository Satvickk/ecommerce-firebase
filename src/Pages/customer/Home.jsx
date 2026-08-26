import { useEffect } from "react";
import Header from "../../Components/Header/Header";
import Banner from "../../Components/Banner/Banner";
import LiveSale from "../../Components/Sale/LiveSale";
import Brands from "../../Components/Special/Brands";
import Products from "../../Components/Products/Products";
import SpecialRelease from "../../Components/Special/SpecialRelease";
import Reviews from "../../Components/Reviews/Reviews";
import NewsLetter from "../../Components/NewsLetter/NewsLetter";
import Footer from "../../Components/Footer/Footer";
import CardStack from "../../Components/Special/CardStack";
import PRODUCT_SERVICE from "../../Firebase/productService";
import CHECKOUT_SERVICE from "../../Firebase/checkoutService";
import { setAllProductDetails } from "../../redux/productSlice";
import { setCheckoutProducts } from "../../redux/checkoutSlice";
import { setProductToCart } from "../../redux/cartSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
export default function Home() {
  const dispatch = useAppDispatch();
  const AllProductsDetails = useAppSelector((state) => state.AllProductsDetails);
  const Checkout = useAppSelector((state) => state.Checkout);
  useEffect(() => {
    if (AllProductsDetails.content.length === 0) {
      const getAllProductsDetails = async () => {
        try {
          const ProductData = await PRODUCT_SERVICE.getProducts();
          dispatch(
            setAllProductDetails({
              content: ProductData,
              totalDoc: ProductData.length
            })
          );
        } catch (error) {
          console.log("error:", error);
        }
      };
      getAllProductsDetails();
    }
  }, [AllProductsDetails.content.length, dispatch]);
  useEffect(() => {
    if (Checkout.selectedProducts.length === 0) {
      const getCheckout = async () => {
        try {
          const CheckoutData = await CHECKOUT_SERVICE.getCheckout();
          if (CheckoutData) {
            dispatch(
              setCheckoutProducts({
                selectedProducts: [...CheckoutData.selectedProducts || []],
                totalCost: CheckoutData.totalCost ? CheckoutData.totalCost : 0,
                checkoutDocId: CheckoutData.checkoutDocId ? CheckoutData.checkoutDocId : ""
              })
            );
            dispatch(
              setProductToCart({
                selectedProducts: [...CheckoutData.selectedProducts || []],
                totalCost: CheckoutData.totalCost ? CheckoutData.totalCost : 0
              })
            );
          }
        } catch (error) {
          console.log("error:", error);
        }
      };
      getCheckout();
    }
  }, [Checkout.selectedProducts.length, dispatch]);
  return <div className="drawer drawer-end"><input id="my-drawer-4" type="checkbox" className="drawer-toggle" /><div className="drawer-content layout-desktop-container"><Header /><div className="layout-desktop-item-grow overflow-hidden"><Banner /><CardStack /><Brands /><Products title={"Trending Now"} slug={"trending"} /><LiveSale /><Products title={"New Arrival"} slug={"newArrival"} /><Products title={"Popular Products"} slug={"popular"} /><Products title={"More Products"} slug={"regular"} /><SpecialRelease /><Reviews /><NewsLetter /></div><Footer /></div><div className="drawer-side z-30"><label
    htmlFor="my-drawer-4"
    aria-label="close sidebar"
    className="drawer-overlay"
  /><ul className="hidden sm:block menu bg-base-200 text-base-content min-h-full w-80 p-4"><li><p>Add cart functionality here</p></li></ul></div></div>;
}
