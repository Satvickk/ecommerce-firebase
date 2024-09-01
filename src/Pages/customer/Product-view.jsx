import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import ProductLayout from "../../Components/Products/Product-layout";
import Banner from "../../Components/Banner/Banner";

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