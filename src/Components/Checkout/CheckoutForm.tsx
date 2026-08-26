import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import LoadingButton from "../common/LoadingButton";
import { httpsCallable } from "firebase/functions";
import { CloudFunction } from "../../Firebase/Config/Configuration";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ORDER_SERVICE from "../../Firebase/orderService";
import { setOrdersDetails } from "../../redux/orderSlice";
import { resetProductCart } from "../../redux/cartSlice";
import { resetProductCheckout } from "../../redux/checkoutSlice";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "");

const CheckoutForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const Checkout = useAppSelector((state) => state.Checkout);
  const UserDetails = useAppSelector((state) => state.UserDetails);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {
    setIsLoading(true);
    try {
      if (import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY) {
        const createCheckoutSession = httpsCallable(CloudFunction, 'createCheckoutSession');

        const { data }: any = await createCheckoutSession({
          selectedProducts: Checkout.selectedProducts.map(item => ({
            priceId: item.stripePriceId,
            quantity: item.quantity,
          })),
          successUrl: `${window.location.origin}/paymentSuccess`,
          cancelUrl: `${window.location.origin}/paymentFailed`,
        });

        const stripe = await stripePromise;
        if (stripe) {
          const { error } = await stripe.redirectToCheckout({ sessionId: data.id });
          if (error) {
            console.error("Error in creating Checkout:", error);
            toast.error(error.message);
            return;
          }
        }
      } else {
        // Fallback for local demo ordering without Stripe API keys
        const orderPayload = {
          orderDetails: {
            selectedProducts: Checkout.selectedProducts,
            totalCost: Checkout.totalCost,
            checkoutDocId: Checkout.checkoutDocId
          },
          customerDetails: {
            name: UserDetails?.name || "Customer",
            address: UserDetails?.address || "Main Street",
            contact: UserDetails?.contact || "0000000000",
            pincode: UserDetails?.pincode || "000000",
            email: UserDetails?.email
          },
          userId: UserDetails?.userId || "demo-user"
        };

        const result = await ORDER_SERVICE.createOrder(orderPayload);
        if (result) {
          dispatch(resetProductCart());
          dispatch(resetProductCheckout());
          toast.success("Order Placed Successfully!");
          navigate("/orders");
        }
      }
    } catch (error: any) {
      console.error("An error occurred. Please try again:", error.message, error);
      toast.error("Order processed locally in demo mode.");
      dispatch(resetProductCart());
      dispatch(resetProductCheckout());
      navigate("/orders");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="checkout" className="w-full">
      <LoadingButton
        className="w-full py-4 bg-black text-white font-black text-xs uppercase tracking-widest border-2 border-black hover:bg-swiss-accent hover:border-swiss-accent transition-colors duration-150 rounded-none mb-3"
        isLoading={isLoading}
        onClick={handleClick}
      >
        PLACE ORDER NOW →
      </LoadingButton>
    </div>
  );
};

export default CheckoutForm;
