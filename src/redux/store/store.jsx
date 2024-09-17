import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../authSlice";
import UserDetailSlice from "../userDetailSlice";
import AllUserSlice from "../allUserSlice";
import AllProductSlice from "../productSlice";
import UserCartSlice from "../cartSlice";
import CheckoutSlice from "../checkoutSlice";
import OrdersSlice from "../orderSlice";
import WishlistSlice from "../userWishlist";

export const Store = configureStore({
    reducer: {
        Auth: AuthSlice,
        UserDetails: UserDetailSlice,
        AllUserDetails: AllUserSlice,
        AllProductsDetails : AllProductSlice,
        UserCart : UserCartSlice,
        Checkout: CheckoutSlice,
        Orders: OrdersSlice,
        Wishlist : WishlistSlice,
    }
})