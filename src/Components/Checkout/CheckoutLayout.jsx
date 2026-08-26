import { useEffect, useState } from "react";
import CHECKOUT_SERVICE from "../../Firebase/checkoutService";
import { toast } from "react-toastify";
import {
  resetProductCheckout,
  setCheckoutProducts
} from "../../redux/checkoutSlice";
import { setProductToCart } from "../../redux/cartSlice";
import CheckoutProductTable from "./CheckoutProductTable";
import { useNavigate } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import ConfirmCancelOrder from "./ConfirmCancelOrder";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
export default function CheckoutLayout() {
  const UserDetails = useAppSelector((state) => state.UserDetails);
  const Checkout = useAppSelector((state) => state.Checkout);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loadingCancel, setLoadingCancel] = useState(false);
  useEffect(() => {
    const getCheckout = async () => {
      try {
        const CheckoutData = await CHECKOUT_SERVICE.getCheckout();
        if (CheckoutData) {
          const { selectedProducts, totalCost, checkoutDocId } = CheckoutData;
          dispatch(
            setCheckoutProducts({
              selectedProducts: [...selectedProducts || []],
              totalCost: totalCost || 0,
              checkoutDocId
            })
          );
          dispatch(
            setProductToCart({
              selectedProducts: [...selectedProducts || []],
              totalCost: totalCost || 0
            })
          );
        }
      } catch (error) {
        console.log("error:", error);
        toast.error("Unable to fetch Cart Products");
      }
    };
    if (Checkout.selectedProducts.length <= 0) {
      getCheckout();
    }
  }, [Checkout.selectedProducts.length, dispatch]);
  const handleDeleteCheckout = async () => {
    setLoadingCancel(true);
    try {
      if (Checkout.checkoutDocId) {
        const result = await CHECKOUT_SERVICE.deleteCheckout(Checkout.checkoutDocId);
        if (result) {
          dispatch(resetProductCheckout());
          toast.info("Your Order is Cancelled !");
          navigate("/");
        }
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
    const modal = document.getElementById("confirmCancelOrder");
    if (modal) modal.close();
  }
  return <section className="w-full bg-white border-b-4 border-black py-12"><div className="max-w-7xl mx-auto px-4 sm:px-8"><div className="flex items-center gap-4 mb-8 pb-4 border-b-4 border-black"><span className="bg-swiss-accent text-white px-3 py-1 text-xs font-black uppercase tracking-widest">
            02. ORDER CHECKOUT
          </span><h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-black">
            CHECKOUT SESSION
          </h1></div><div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">{
    /* Left Column: Delivery Address Panel */
  }<div className="lg:col-span-5 border-4 border-black bg-swiss-muted p-6 space-y-4"><h3 className="text-sm font-black uppercase tracking-widest text-black border-b-2 border-black pb-3">
              01. SHIPPING ADDRESS
            </h3><div className="space-y-2 text-xs font-bold uppercase tracking-wider text-black"><div className="text-sm font-black text-black">{UserDetails?.name || "CUSTOMER NAME"}</div><p className="leading-relaxed">{UserDetails?.address || "STREET ADDRESS NOT SET"}</p><p>PINCODE: {UserDetails?.pincode || "N/A"}</p><p className="pt-2 border-t border-black text-gray-600">CONTACT: {UserDetails?.contact || "N/A"}</p><p className="text-gray-600">EMAIL: {UserDetails?.email || "N/A"}</p></div></div>{
    /* Right Column: Products & Payment */
  }<div className="lg:col-span-7 border-4 border-black bg-white p-6 space-y-6"><h3 className="text-sm font-black uppercase tracking-widest text-black border-b-2 border-black pb-3">
              02. SELECTED HARDWARE
            </h3><CheckoutProductTable CheckoutData={Checkout} /><div className="space-y-3 pt-4 border-t-2 border-black"><CheckoutForm /><button
    className="w-full py-3 bg-white text-black font-black text-xs uppercase tracking-widest border-2 border-black hover:bg-swiss-accent hover:text-white hover:border-swiss-accent transition-colors duration-150 rounded-none"
    onClick={() => {
      const modal = document.getElementById("confirmCancelOrder");
      if (modal) modal.showModal();
    }}
  >
                CANCEL CHECKOUT SESSION ✕
              </button></div></div></div></div><ConfirmCancelOrder
    handleClose={handleClose}
    handleOrderLater={handleOrderLater}
    handleConfirm={handleDeleteCheckout}
    loading={loadingCancel}
  /></section>;
}
