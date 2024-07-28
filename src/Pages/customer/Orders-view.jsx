import React from "react";

const Header = React.lazy(() => import("../../Components/Header/Header"));
const Footer = React.lazy(() => import("../../Components/Footer/Footer"));
const Banner = React.lazy(() => import("../../Components/Banner/Banner"));
const OrderLayout = React.lazy(() =>
  import("../../Components/Orders/OrderLayout")
);

export default function OrdersView() {
  return (
    <>
      <div className="layout-desktop-container">
        <Header />
        <div className="layout-desktop-item-grow sm:justify-center">
          <Banner />
          <OrderLayout />
        </div>
        <Footer />
      </div>
    </>
  );
}
