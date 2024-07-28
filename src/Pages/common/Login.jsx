import React from "react";

const Header = React.lazy(() => import("../../Components/Header/Header"));
const LoginForm = React.lazy(() =>
  import("../../Components/Authentication/LoginForm")
);
const Footer = React.lazy(() => import("../../Components/Footer/Footer"));

export default function Login() {

  return (
    <div className="layout-desktop-container">
      <Header />
      <div className="layout-desktop-item-grow sm:justify-center">
      <LoginForm />
      </div>
      <Footer />
    </div>
  );
}
