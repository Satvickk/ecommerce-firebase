import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CHECKOUT_SERVICE from "../../Firebase/checkoutService";
import { toast } from "react-toastify";
import {
  resetProductCheckout,
  setCheckoutProducts,
} from "../../redux/checkoutSlice";
import { setProductToCart } from "../../redux/cartSlice";
import CheckoutProductTable from "./CheckoutProductTable";
import LoadingButton from "../common/LoadingButton";
import { useNavigate } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import ConfirmCancelOrder from "./ConfirmCancelOrder";

export default function CheckoutLayout() {
  const UserDetails = useSelector((state) => state.UserDetails);
  const Checkout = useSelector((state) => state.Checkout);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingCancel, setLoadingCancel] = useState(false);

  useEffect(() => {
    const getCheckout = async () => {
      try {
        const CheckoutData = await CHECKOUT_SERVICE.getCheckout();
        const { selectedProducts, totalCost, checkoutDocId } = CheckoutData;
        dispatch(
          setCheckoutProducts({
            selectedProducts: [...selectedProducts],
            totalCost: totalCost,
            checkoutDocId: checkoutDocId,
          })
        );
        dispatch(
          setProductToCart({
            selectedProducts: [...selectedProducts],
            totalCost: totalCost,
          })
        );
      } catch (error) {
        console.log("error:", error);
        toast.error("Unable to fetch Cart Products");
      }
    };

    if (Checkout.selectedProducts.length <= 0) {
      getCheckout();
    }
  }, [Checkout]);

  const handleOrder = () => {
    navigate("/payment");
  };

  const handleDeleteCheckout = async () => {
    setLoadingCancel(true);
    try {
      const result = await CHECKOUT_SERVICE.deleteCheckout(
        Checkout.checkoutDocId
      );
      if (result) {
        dispatch(resetProductCheckout());
        toast.info("Your Order is Cancelled !");
        navigate("/");
      }
    } catch (error) {
      console.log("error ::", error);
    } finally {
      setLoadingCancel(false);
    }
  };

  function handleOrderLater() {
    handleClose();
    navigate("/");
  }

  function handleClose() {
    document.getElementById("confirmCancelOrder").close();
  }

  return (
    <section className="bg-gray-100 py-8 antialiased md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-xl font-semibold text-gray-900 sm:text-3xl">
            Checkout
          </h1>
          <div className="grid lg:grid-cols-12 sm:gap-6">
            <div className="mt-6 lg:col-span-5 sm:mt-8 lg:flex lg:flex-col lg:items-start lg:gap-2 bg-slate-200 rounded-md px-5 py-3">
              <h2 className="text-xl font-semibold text-gray-900 sm:text-xl">
                Delivered to -
              </h2>
              <p className="text-center text-gray-500 lg:text-left">
                {UserDetails?.name},
              </p>
              <p className="text-center text-gray-500 lg:text-left">
                {UserDetails?.address} - {UserDetails?.pincode}
              </p>
              <p className="text-center text-gray-500 lg:text-left">
                Ph-no: {UserDetails?.contact}
              </p>
            </div>
            <div className="mt-6 lg:col-span-7 sm:mt-8 lg:flex lg:flex-col lg:items-start lg:gap-2">
              <h2 className="text-xl font-semibold text-gray-900 sm:text-xl">
                Your Products
              </h2>
              <CheckoutProductTable CheckoutData={Checkout} />
              <div className="w-full">
                <CheckoutForm />
              </div>
              <button
                className="btn btn-outline w-full"
                onClick={() =>
                  document.getElementById("confirmCancelOrder").showModal()
                }
              >
                Cancel Order
              </button>
            </div>
          </div>
          <p className="mt-6 text-center text-gray-500 sm:mt-8 lg:text-left">
            Payment processed by MyShop
          </p>
        </div>
      </div>
      <ConfirmCancelOrder
        handleClose={handleClose}
        handleOrderLater={handleOrderLater}
        handleConfirm={handleDeleteCheckout}
        loading={loadingCancel}
      />
    </section>
  );
}
