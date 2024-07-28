import React from "react";

const Header = React.lazy(() => import("../../Components/Header/Header"));
const Footer = React.lazy(() => import("../../Components/Footer/Footer"));
const NotFound = React.lazy(() => import("../../Components/NotFound/NotFound"));

export default function Error() {
  return (
    <div className="layout-desktop-container">
      <Header />
      <div className="layout-desktop-item-grow sm:justify-center">
        <NotFound />
      </div>
      <Footer />
    </div>
  );
}
