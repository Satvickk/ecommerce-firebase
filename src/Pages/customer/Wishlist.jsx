import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import WishListProduct from "../../Components/WishList/WishListProduct";
import Banner from "../../Components/Banner/Banner";

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
