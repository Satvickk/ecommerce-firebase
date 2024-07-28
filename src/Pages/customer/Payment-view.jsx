import React from "react";

const Header = React.lazy(() => import("../../Components/Header/Header"));
const Footer = React.lazy(() => import("../../Components/Footer/Footer"));
const PaymentLayout = React.lazy(() => import("../../Components/Payment/PaymentLayout"));

export default function PaymentView(){
  
    return(
      <div className="layout-desktop-container">
        <Header />
        <div className="layout-desktop-item-grow sm:justify-center">
          <PaymentLayout />
        </div>
        <Footer />
      </div>
    )
}