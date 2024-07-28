import React from "react";

const Header = React.lazy(() => import("../../Components/Header/Header"));
const Footer = React.lazy(() => import("../../Components/Footer/Footer"));
const CartLayout = React.lazy(() => import("../../Components/Cart/CartLayout"))

export default function CartView(){
  
    return(
      <>
      <Header />
      <CartLayout />
      <Footer />
      </>
    )
}