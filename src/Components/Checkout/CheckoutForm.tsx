import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import LoadingButton from "../common/LoadingButton";
import { httpsCallable } from "firebase/functions";
import { CloudFunction } from "../../Firebase/Config/Configuration";
import { useAppSelector } from "../../redux/hooks";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "");

const CheckoutForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const Checkout = useAppSelector((state) => state.Checkout);

  const handleClick = async () => {
    setIsLoading(true);
    try {
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
    } catch (error: any) {
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
