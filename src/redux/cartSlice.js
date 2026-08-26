import { createSlice } from "@reduxjs/toolkit";
export const initialCartState = {
  selectedProducts: [],
  totalCost: 0
};
export const UserCartSlice = createSlice({
  name: "Cart",
  initialState: initialCartState,
  reducers: {
    setProductToCart: (state, action) => {
      state.selectedProducts = [...action.payload.selectedProducts];
      state.totalCost = action.payload.totalCost;
    },
    addProductToCart: (state, action) => {
      const existing = state.selectedProducts.find((item) => item.docId === action.payload.docId);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.selectedProducts.push({ ...action.payload, quantity: 1 });
      }
      state.totalCost += action.payload.price;
    },
    increaseProductQuantity: (state, action) => {
      const itemToIncrease = state.selectedProducts.find((item) => item.docId === action.payload.docId);
      if (itemToIncrease) {
        itemToIncrease.quantity += 1;
        state.totalCost += action.payload.price;
      }
    },
    decreaseProductQuantity: (state, action) => {
      const itemToDecrease = state.selectedProducts.find((item) => item.docId === action.payload.docId);
      if (itemToDecrease && itemToDecrease.quantity > 1) {
        itemToDecrease.quantity -= 1;
        state.totalCost -= action.payload.price;
      }
    },
    removeProductFromCart: (state, action) => {
      const productToRemove = state.selectedProducts.find((item) => item.docId === action.payload.docId);
      if (productToRemove) {
        state.totalCost -= productToRemove.price * productToRemove.quantity;
      }
      state.selectedProducts = state.selectedProducts.filter(
        (item) => item.docId !== action.payload.docId
      );
    },
    resetProductCart: () => {
      return initialCartState;
    }
  }
});
export const {
  addProductToCart,
  setProductToCart,
  increaseProductQuantity,
  decreaseProductQuantity,
  removeProductFromCart,
  resetProductCart
} = UserCartSlice.actions;
export default UserCartSlice.reducer;
