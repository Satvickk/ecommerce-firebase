import Footer from "../../Components/Footer/Footer";
import PaymentCancelPage from "../../Components/Special/PaymentCancelPage";

export default function FailedPage() {
  return (
    <div className="layout-desktop-container">
      <div className="layout-desktop-item-grow sm:justify-center">
        <PaymentCancelPage />
      </div>
      <Footer />
    </div>
  );
}
