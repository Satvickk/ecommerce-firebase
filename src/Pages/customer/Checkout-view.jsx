import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import CheckoutLayout from "../../Components/Checkout/CheckoutLayout";

export default function CheckoutView(){
  
    return(
      <div className="layout-desktop-container">
        <Header />
        <div className="layout-desktop-item-grow sm:justify-center">
          <CheckoutLayout />
        </div>
        <Footer />
      </div>
    )
}