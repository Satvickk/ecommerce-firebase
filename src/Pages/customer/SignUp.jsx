import Header from "../../Components/Header/Header";
import SignUpForm from "../../Components/Authentication/SignUpForm";
import Footer from "../../Components/Footer/Footer";
export default function SignUp() {
  return (
    <>
      <div className="layout-desktop-container">
        <Header />
        <div className="layout-desktop-item-grow sm:justify-center">
          <SignUpForm />
        </div>
        <Footer />
      </div>
    </>
  );
}
