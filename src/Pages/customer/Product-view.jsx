import React from "react";

const Header = React.lazy(() => import("../../Components/Header/Header"));
const Footer = React.lazy(() => import("../../Components/Footer/Footer"));
const ProductLayout = React.lazy(() => import("../../Components/Products/Product-layout"))
const Banner = React.lazy(() => import("../../Components/Banner/Banner"));


export default function ProductView() {
  
    return(
      <div className="layout-desktop-container">
        <Header />
        <div className="layout-desktop-item-grow sm:justify-center">
          <Banner />
          <ProductLayout />
        </div>
        <Footer />
      </div>
    )
}