import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentStatus, setPaymentStatus] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      // Make sure to replace with your real PaymentIntent client_secret
      clientSecret: import.meta.env.VITE_CLIENT_SECRET,
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'John Doe',
        },
      },
    });

    if (error) {
      setPaymentStatus(`Payment failed: ${error.message}`);
    } else if (paymentIntent) {
      setPaymentStatus(`Payment successful! Status: ${paymentIntent.status}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>Pay</button>
      <div>{paymentStatus}</div>
    </form>
  );
};

export default PaymentForm;
