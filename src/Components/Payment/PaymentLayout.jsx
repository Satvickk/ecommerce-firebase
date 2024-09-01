// import { useState, useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import PaymentForm from "./PaymentForm";

// const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
// const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

// export default function PaymentLayout() {
//   const [clientSecret, setClientSecret] = useState("");

//   useEffect(() => {
//     const createPaymentIntent = async () => {
//       const items = [{ id: "xl-tshirt", amount: 2000 }]; // Example items
//       const orderAmount = items.reduce((total, item) => total + item.amount, 0);

//       // Create PaymentIntent using Stripe client-side API
//       const response = await fetch("https://api.stripe.com/v1/payment_intents", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//           "Authorization": `Bearer ${import.meta.env.VITE_STRIPE_SECRET_KEY}`,
//         },
//         body: new URLSearchParams({
//           amount: orderAmount,
//           currency: "usd",
//           "automatic_payment_methods[enabled]": "true",
//         }).toString(),
//       });

//       const data = await response.json();
//       setClientSecret(data.client_secret);
//     };

//     createPaymentIntent();
//   }, []);

//   const appearance = {
//     theme: 'stripe',
//   };

//   const options = {
//     clientSecret,
//     appearance,
//   };

//   return (
//     // <section className="bg-gray-100 py-8 antialiased md:py-16">
//     //   <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
//     //     <div className="mx-auto max-w-5xl">
//     //       <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">Payment</h2>
//     //       <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
//             // {clientSecret && (
//               <Elements options={options} stripe={stripePromise} >
//                 <PaymentForm />
//               </Elements>
//             // )}
//      //       <PriceSummaryCard />
//     //       </div>
//     //       <p className="mt-6 text-center text-gray-500 sm:mt-8 lg:text-left">
//     //         Payment processed by MyShop
//     //       </p>
//     //     </div>
//     //   </div>
//     // </section>
//   );
// }
