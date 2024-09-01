import { useEffect } from "react";
import Footer from "../../Components/Footer/Footer";
import PaymentSuccessPage from "../../Components/Special/PaymentSuccessPage";
import { useDispatch, useSelector } from "react-redux";
import CHECKOUT_SERVICE from "../../Firebase/checkoutService";
import ORDER_SERVICE from "../../Firebase/orderService";
import { setOrdersDetails } from "../../redux/orderSlice";
import { setCheckoutProducts } from "../../redux/checkoutSlice";
import { toast } from "react-toastify";

export default function SuccessPage() {
  const Checkout = useSelector((state) => state.Checkout);
  const User = useSelector((state) => state.UserDetails);
  const dispatch = useDispatch();

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
      } catch (error) {
        console.log("error:", error);
        toast.error("Unable to fetch Cart Products");
      }
    };

    if (Checkout.selectedProducts.length <= 0) {
      getCheckout();
    }
  }, [Checkout.selectedProducts.length, dispatch]);

  useEffect(() => {
    const createNewOrder = async () => {
      try {
        const payload = {
          orderDetails: Checkout,
          customerDetails: {
            customerName: User?.name,
            pincode: User?.pincode,
            address: User?.address,
            contact: User?.contact,
            email: User?.email
          },
          userId: User?.userId
        };
        await ORDER_SERVICE.createOrder({ ...payload });
        dispatch(setOrdersDetails(payload));

        await CHECKOUT_SERVICE.deleteCheckout(Checkout?.checkoutDocId);
      } catch (error) {
        console.error("Error in creating order:", error);
      }
    };

    if (Checkout.selectedProducts.length > 0 && User) {
      createNewOrder();
    }
  }, [Checkout, User, dispatch]);

  return (
    <div className="layout-desktop-container">
      <div className="layout-desktop-item-grow sm:justify-center">
        <PaymentSuccessPage />
      </div>
      <Footer />
    </div>
  );
}
