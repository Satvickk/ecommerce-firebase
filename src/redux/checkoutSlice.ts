import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CheckoutState, Product } from "../types";

export const initialCheckoutState: CheckoutState = {
  selectedProducts: [],
  totalCost: 0,
  checkoutDocId: "",
};

export const CheckoutSlice = createSlice({
  name: "Checkout",
  initialState: initialCheckoutState,
  reducers: {
    setCheckoutProducts: (state, action: PayloadAction<CheckoutState>) => {
      state.selectedProducts = [...action.payload.selectedProducts];
      state.totalCost = action.payload.totalCost;
      state.checkoutDocId = action.payload?.checkoutDocId;
    },
    addProductToCheckout: (state, action: PayloadAction<Product>) => {
      state.selectedProducts.push({ ...action.payload, quantity: 1 });
      state.totalCost += action.payload.price;
    },
    increaseProductQuantity: (state, action: PayloadAction<{ docId: string; price: number }>) => {
      const itemToIncrease = state.selectedProducts.find((item) => item.docId === action.payload.docId);
      if (itemToIncrease) {
        itemToIncrease.quantity += 1;
        state.totalCost += action.payload.price;
      }
    },
    decreaseProductQuantity: (state, action: PayloadAction<{ docId: string; price: number }>) => {
      const itemToDecrease = state.selectedProducts.find((item) => item.docId === action.payload.docId);
      if (itemToDecrease && itemToDecrease.quantity > 1) {
        itemToDecrease.quantity -= 1;
        state.totalCost -= action.payload.price;
      }
    },
    removeProductFromCheckout: (state, action: PayloadAction<{ docId: string }>) => {
      const productToRemove = state.selectedProducts.find(item => item.docId === action.payload.docId);
      if (productToRemove) {
        state.totalCost -= productToRemove.price * productToRemove.quantity;
      }
      state.selectedProducts = state.selectedProducts.filter(
        (item) => item.docId !== action.payload.docId
      );
    },
    resetProductCheckout: () => {
      return initialCheckoutState;
    },
  }
});

export const {
  setCheckoutProducts,
  addProductToCheckout,
  increaseProductQuantity,
  decreaseProductQuantity,
  removeProductFromCheckout,
  resetProductCheckout
} = CheckoutSlice.actions;

export default CheckoutSlice.reducer;
