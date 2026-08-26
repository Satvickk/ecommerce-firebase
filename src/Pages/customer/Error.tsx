import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import NotFound from "../../Components/NotFound/NotFound";

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
