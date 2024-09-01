import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import LoadingButton from "../common/LoadingButton";
import { httpsCallable } from "firebase/functions";
import { CloudFunction } from "../../Firebase/Config/Configuration";
import ORDER_SERVICE from "../../Firebase/orderService";
import CHECKOUT_SERVICE from "../../Firebase/checkoutService"
import { setOrdersDetails } from "../../redux/orderSlice";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const Checkout = useSelector((state) => state.Checkout);
  const User = useSelector((state) => state.UserDetails)
  const dispatch = useDispatch();

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const createCheckoutSession = httpsCallable(CloudFunction, 'createCheckoutSession');

      // Call the Cloud Function
      const { data } = await createCheckoutSession({
        selectedProducts: Checkout.selectedProducts.map(item => ({
          priceId: item.stripePriceId, // Ensure priceId is used correctly
          quantity: item.quantity,
        })),

        //need to add complete order and cancel order page
        successUrl: `${window.location.origin}/paymentSuccess`,
        cancelUrl: `${window.location.origin}/paymentFailed`,
      });

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId: data.id });

      if (error) {
        console.error("Error in creating Checkout:", error);
        toast.error(error.message);
        return;
      }
    } catch (error) {
      console.error("An error occurred. Please try again:", error.message, error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="checkout">
      <LoadingButton
        className="w-full mb-3"
        isLoading={isLoading}
        onClick={handleClick}
      >
        Place Order
      </LoadingButton>
    </div>
  );
};

export default CheckoutForm;
