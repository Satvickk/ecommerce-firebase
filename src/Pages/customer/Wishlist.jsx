import React from "react";

const Header = React.lazy(() => import("../../Components/Header/Header"));
const Footer = React.lazy(() => import("../../Components/Footer/Footer"));
const WishListProduct = React.lazy(() =>
  import("../../Components/WishList/WishListProduct")
);
const Banner = React.lazy(() => import("../../Components/Banner/Banner"));

export default function Wishlist() {
  return (
    <div className="layout-desktop-container">
      <Header />
      <div className="layout-desktop-item-grow sm:justify-center">
        <Banner />
        <WishListProduct />
      </div>
      <Footer />
    </div>
  );
}
