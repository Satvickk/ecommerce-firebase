import { createSlice } from "@reduxjs/toolkit";

const initialWishList = {
    customerId: "",
    selectedProducts: [],
    totalDoc: 0
}

export const WishlistSlice = createSlice({
    name: "Wishlist",
    initialState: initialWishList,
    reducers: {
        setWishlist: (state, action ) => {
            state.customerId = action.payload.customerId
            state.selectedProducts = action.payload.selectedProducts
            state.totalDoc = action.payload.totalDoc
        },
        addProductToWishlist: (state, action) => {
            state.selectedProducts = [action.payload, ...state.selectedProducts]
            state.totalDoc = state.totalDoc + 1
            return true
        },
        removeProductFromWishlist: (state, action) => {
            state.selectedProducts = state.selectedProducts.filter((item) => item.id !== action.payload.id)
            state.totalDoc = state.totalDoc - 1
            return true
        },
        emptyWishlist : (state) => {
            state.selectedProducts = []
            state.totalDoc = 0
        }
    }
})

export const {
    addProductToWishlist,
    emptyWishlist,
    removeProductFromWishlist,
    setWishlist
} = WishlistSlice.actions;

export default WishlistSlice.reducer;