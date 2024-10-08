import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import SuccessPage from "../Pages/customer/SuccessPage";
import FailedPage from "../Pages/customer/FailedPage";

const Home = React.lazy(() => import("../Pages/customer/Home"));
const Error = React.lazy(() => import("../Pages/customer/Error"));
const Login = React.lazy(() => import("../Pages/common/Login"));
const SignUp = React.lazy(() => import("../Pages/customer/SignUp"));
const Wishlist = React.lazy(() => import("../Pages/customer/Wishlist"));
const ProductView = React.lazy(() => import("../Pages/customer/Product-view"));
const OrdersView = React.lazy(() => import("../Pages/customer/Orders-view"));
const CartView = React.lazy(() => import("../Pages/customer/Cart-view"));
const CheckoutView = React.lazy(() => import("../Pages/customer/Checkout-view"))
const Settings = React.lazy(() => import("../Pages/customer/Settings"));
const PaymentView = React.lazy(() => import("../Pages/customer/Payment-view"));
const UserProfile = React.lazy(() =>
  import("../Components/Settings/UserProfile")
);
const UpdateProfile = React.lazy(() =>
  import("../Components/Settings/UpdateProfile")
);

const AdminLayout = React.lazy(() => import("../Pages/admin/AdminLayout"));
const AdminUserView = React.lazy(() => import("../Components/Admin/User-view"));
const AdminOrdersView = React.lazy(() =>
  import("../Components/Admin/Order-view")
);
const AdminProductView = React.lazy(() =>
  import("../Components/Admin/Product-view")
);
const AdminProfile = React.lazy(() =>
  import("../Components/Admin/Admin-profile")
);

export default function RoutesLayout() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route element={<PrivateRoute />}>
        <Route path="/product" element={<ProductView />} />
        <Route path="/cart" element={<CartView />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/payment" element={<PaymentView />} />
        <Route path="/checkout" element={<CheckoutView />} />
        <Route path="/orders" element={<OrdersView />} />
        <Route path="/paymentSuccess" element={<SuccessPage />} />
        <Route path="/paymentFailed" element={<FailedPage />} />
        <Route path="/settings" element={<Settings />}>
          <Route path="" element={<UserProfile />} />
          <Route path="update" element={<UpdateProfile />} />
        </Route>
        <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="" element={<AdminUserView />} />
          <Route path="adminProducts" element={<AdminProductView />} />
          <Route path="adminOrders" element={<AdminOrdersView />} />
          <Route path="adminProfile" element={<AdminProfile />} />
        </Route>
        </Route>
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
