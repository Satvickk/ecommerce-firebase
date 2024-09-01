import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Banner from "../../Components/Banner/Banner";
import OrderLayout from "../../Components/Orders/OrderLayout";

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
