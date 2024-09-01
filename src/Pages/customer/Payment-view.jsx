// // import React, { useState } from "react";


// // export default function PaymentView(){
  
// //     return(
// //       <div className="layout-desktop-container">
// // const Return = () => {
// //   const [status, setStatus] = useState(null);
// //   const [customerEmail, setCustomerEmail] = useState("");

// //   React.useEffect(() => {
// //     const queryString = window.location.search;
// //     const urlParams = new URLSearchParams(queryString);
// //     const sessionId = urlParams.get("session_id");

// //     if (sessionId) {
// //       fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
// //         method: "GET",
// //         headers: {
// //           Authorization: `Bearer ${import.meta.env.VITE_STRIPE_SECRET_KEY}`,
// //         },
// //       })
// //         .then((res) => res.json())
// //         .then((data) => {
// //           setStatus(data.payment_status); // This field may vary, check Stripe's API docs
// //           setCustomerEmail(data.customer_email);
// //         });
// //     }
// //   }, []);

// //   if (status === "paid") {
// //     return (
// //       <section id="success">
// //         <p>
// //           We appreciate your business! A confirmation email will be sent to{" "}
// //           {customerEmail}. If you have any questions, please email{" "}
// //           <a href="mailto:orders@example.com">orders@example.com</a>.
// //         </p>
// //       </section>
// //     );
// //   }

// //   if (status === "unpaid") {
// //     return (
// //       <section id="cancel">
// //         <p>Payment was not completed. Please try again.</p>
// //       </section>
// //     );
// //   }

// //   return null;
// // };

// // const App = () => {
// //   const [isReturning, setIsReturning] = useState(
// //     window.location.pathname === "/return"
// //   );

// //   return (
// //     <div className="App">{isReturning ? <Return /> : <CheckoutForm />}</div>
// //   );
// // };

// // export default App;

// //       </div>
// //     )
// // }



// import { useState, useEffect } from "react";

// export default function PaymentView() {
//   const Return = () => {
//     const [status, setStatus] = useState(null);
//     const [customerEmail, setCustomerEmail] = useState("");

//     useEffect(() => {
//       const queryString = window.location.search;
//       const urlParams = new URLSearchParams(queryString);
//       const sessionId = urlParams.get("session_id");

//       if (sessionId) {
//         fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${import.meta.env.VITE_STRIPE_SECRET_KEY}`,
//           },
//         })
//           .then((res) => res.json())
//           .then((data) => {
//             setStatus(data.payment_status); // This field may vary, check Stripe's API docs
//             setCustomerEmail(data.customer_email);
//           })
//           .catch((error) => {
//             console.error("Error fetching session:", error);
//           });
//       }
//     }, []);

//     if (status === "paid") {
//       return (
//         <section id="success">
//           <p>
//             We appreciate your business! A confirmation email will be sent to{" "}
//             {customerEmail}. If you have any questions, please email{" "}
//             <a href="satvickpathak@gmail.com">myShop@gmail.com</a>.
//           </p>
//         </section>
//       );
//     }

//     if (status === "unpaid") {
//       return (
//         <section id="cancel">
//           <p>Payment was not completed. Please try again.</p>
//         </section>
//       );
//     }

//     return null; // Optionally, you can show a loading spinner here
//   };

//   return (
//     <div className="layout-desktop-container">
//       <Return />
//     </div>
//   );
// }
