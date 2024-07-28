import React from "react";

const Header = React.lazy(() => import("../../Components/Header/Header"));
const Banner = React.lazy(() => import("../../Components/Banner/Banner"));
const LiveSale = React.lazy(() => import("../../Components/Sale/LiveSale"))
const Brands = React.lazy(() => import("../../Components/Special/Brands"));
const Products = React.lazy(() => import("../../Components/Products/Products"));
const SpecialRelease = React.lazy(() => import("../../Components/Special/SpecialRelease"));
const Reviews = React.lazy(() => import("../../Components/Reviews/Reviews"));
const NewsLetter = React.lazy(() => import("../../Components/NewsLetter/NewsLetter"))
const Footer = React.lazy(() => import("../../Components/Footer/Footer"));

export default function Home() {

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content layout-desktop-container">
        <Header />
        <div className="layout-desktop-item-grow">
        <Banner />
        <LiveSale />
        <Brands />
        <Products title={"Trending Now"} />
        <Products title={"New Arrival"} />
        <Products title={"Popular Products"} />
        <SpecialRelease />
        <Reviews />
        <NewsLetter />
        </div>
        <Footer />
      </div>
      <div className="drawer-side z-30">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        
        <ul className="hidden sm:block menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* add cart functionality */}
          <li>
            <p>add cart functionality</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
