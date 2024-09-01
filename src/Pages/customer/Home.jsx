import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

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

export default function Home() {
  const dispatch = useDispatch();
  const AllProductsDetails = useSelector((state) => state.AllProductsDetails);
  const Checkout = useSelector((state) => state.Checkout);

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

  useEffect(() => {
    if (Checkout.selectedProducts.length === 0) {
      const getCheckout = async () => {
        try {
          const CheckoutData = await CHECKOUT_SERVICE.getCheckout();
          dispatch(
            setCheckoutProducts({
              selectedProducts: [...CheckoutData?.selectedProducts || []],
              totalCost: CheckoutData?.totalCost,
              checkoutDocId: CheckoutData?.checkoutDocId,
            })
          );
          dispatch(
            setProductToCart({
              selectedProducts: [...CheckoutData?.selectedProducts || []],
              totalCost:Checkout?. totalCost,
            })
          );
        } catch (error) {
          console.log("error:", error);
          // toast.error("Unable to fetch Cart Products"); - commented so that if there is no checkout it will not show error
        }
      };

      getCheckout();
    }
  }, [Checkout.selectedProducts.length, dispatch]);

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content layout-desktop-container">
        <Header />
        <div className="layout-desktop-item-grow">
          <Banner />
          <CardStack />
          <Brands />
          <Products title={"Trending Now"} slug={"trending"} />
          <LiveSale />
          <Products title={"New Arrival"} slug={"newArrival"} />
          <Products title={"Popular Products"} slug={"popular"} />
          <Products title={"More Products"} slug={"regular"} />
          <SpecialRelease />
          <Reviews />
          <NewsLetter />
        </div>
        <Footer />
      </div>
      <div className="drawer-side z-30">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="hidden sm:block menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Add cart functionality */}
          <li>
            <p>Add cart functionality here</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
