import { createSlice } from "@reduxjs/toolkit";

export const initialCheckoutState = {
  selectedProducts: [],
  totalCost: 0,
  checkoutDocId: "",
};

export const CheckoutSlice = createSlice({
  name: "Checkout",
  initialState: initialCheckoutState,
  reducers: {
    // payload - CartData
    setCheckoutProducts: (state, action) => {
      state.selectedProducts = [...action.payload.selectedProducts]
      state.totalCost = action.payload.totalCost;
      state.checkoutDocId = action.payload?.checkoutDocId;
    },

    // payload - product data
    addProductToCheckout: (state, action) => {
      state.selectedProducts.push({ ...action.payload, quantity: 1 });
      state.totalCost += action.payload.price;
    },
    
    // payload - product docId, and price
    increaseProductQuantity: (state, action) => {
      const itemToIncrease = state.selectedProducts.find((item) => item.docId === action.payload.docId);
      if (itemToIncrease) {
        itemToIncrease.quantity += 1;
        state.totalCost += action.payload.price;
      }
    },
    
    // payload - product docId, and price
    decreaseProductQuantity: (state, action) => {
      const itemToDecrease = state.selectedProducts.find((item) => item.docId === action.payload.docId);
      if (itemToDecrease && itemToDecrease.quantity > 1) {
        itemToDecrease.quantity -= 1;
        state.totalCost -= action.payload.price;
      }
    },

     // payload - product data
    removeProductFromCheckout: (state, action) => {
      const productToRemove = state.selectedProducts.find(item => item.docId === action.payload.docId);
      if (productToRemove) {
        state.totalCost -= productToRemove.price * productToRemove.quantity;
      }
      state.selectedProducts = state.selectedProducts.filter(
        (item) => item.docId !== action.payload.docId
      );
    },
    
    // Reset the checkout
    resetProductCheckout: () => {
      return initialCheckoutState;
    },
  }
});

export const { setCheckoutProducts, addProductToCheckout, increaseProductQuantity, decreaseProductQuantity, removeProductFromCheckout, resetProductCheckout } = CheckoutSlice.actions;

export default CheckoutSlice.reducer;
