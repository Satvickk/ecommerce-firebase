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
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      import.meta.env.VITE_CLIENT_SECRET || "",
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: "John Doe"
          }
        }
      }
    );
    if (error) {
      setPaymentStatus(`Payment failed: ${error.message}`);
    } else if (paymentIntent) {
      setPaymentStatus(`Payment successful! Status: ${paymentIntent.status}`);
    }
  };
  return <form onSubmit={handleSubmit}><CardElement /><button type="submit" disabled={!stripe}>Pay</button><div>{paymentStatus}</div></form>;
};
export default PaymentForm;
