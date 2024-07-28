import React from "react";

const Header = React.lazy(() => import("../../Components/Header/Header"));
const SignUpForm = React.lazy(() =>
  import("../../Components/Authentication/SignUpForm")
);
const Footer = React.lazy(() => import("../../Components/Footer/Footer"));

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
