import { useEffect } from "react";
import Footer from "../../Components/Footer/Footer";
import PaymentSuccessPage from "../../Components/Special/PaymentSuccessPage";
import CHECKOUT_SERVICE from "../../Firebase/checkoutService";
import ORDER_SERVICE from "../../Firebase/orderService";
import { addOrderDetails } from "../../redux/orderSlice";
import { setCheckoutProducts } from "../../redux/checkoutSlice";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import type { RootState } from "../../redux/store/store";
import { Order } from "../../types";

export default function SuccessPage() {
  const Checkout = useAppSelector((state: RootState) => state.Checkout);
  const User = useAppSelector((state: RootState) => state.UserDetails);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getCheckout = async () => {
      try {
        const CheckoutData = await CHECKOUT_SERVICE.getCheckout();
        if (CheckoutData) {
          const { selectedProducts, totalCost, checkoutDocId } = CheckoutData;
          dispatch(
            setCheckoutProducts({
              selectedProducts: [...(selectedProducts || [])],
              totalCost: totalCost || 0,
              checkoutDocId: checkoutDocId,
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

  useEffect(() => {
    const createNewOrder = async () => {
      if (!User?.userId) return;
      try {
        const payload: Order = {
          orderId: ORDER_SERVICE.generateOrderId(),
          orderDetails: Checkout,
          customerDetails: {
            name: User?.name || "",
            pincode: User?.pincode || "",
            address: User?.address || "",
            contact: User?.contact || "",
            email: User?.email || ""
          },
          userId: User?.userId,
          orderDate: ORDER_SERVICE.getDateAndTime(),
          deliveryStatus: 2
        };
        await ORDER_SERVICE.createOrder({
          orderDetails: Checkout,
          customerDetails: payload.customerDetails,
          userId: User.userId
        });
        dispatch(addOrderDetails(payload));

        if (Checkout?.checkoutDocId) {
          await CHECKOUT_SERVICE.deleteCheckout(Checkout.checkoutDocId);
        }
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
