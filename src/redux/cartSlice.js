import { createSlice } from "@reduxjs/toolkit";

export const initialCartState = {
  selectedProducts: [],
  totalCost: 0,
};

export const UserCartSlice = createSlice({
  name: "Cart",
  initialState: initialCartState,
  reducers: {
    // payload - cart data
    setProductToCart: (state, action) => {
      state.selectedProducts = [...action.payload.selectedProducts]
      state.totalCost = action.payload.totalCost;
    },

    // payload - product data
    addProductToCart: (state, action) => {
      state.selectedProducts.push({ ...action.payload, quantity: 1 });
      state.totalCost += action.payload.price;
    },
    
     // payload - product docId, and price
    increaseProductQuantity: (state, action) => {
      state.selectedProducts = state.selectedProducts.map((item) => 
        item.docId === action.payload.docId 
        ? { ...item, quantity: item.quantity + 1 } 
        : item
      );
      state.totalCost += action.payload.price;
    },
    
     // payload - product docId, and price
    decreaseProductQuantity: (state, action) => {
      state.selectedProducts = state.selectedProducts.map((item) => 
        item.docId === action.payload.docId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 } 
        : item
      );
      state.totalCost -= action.payload.price;
    },
    
     // payload - product data
    removeProductFromCart: (state, action) => {
      const productToRemove = state.selectedProducts.find(item => item.docId === action.payload.docId);
      if (productToRemove) {
        state.totalCost -= productToRemove.price * productToRemove.quantity;
      }
      state.selectedProducts = state.selectedProducts.filter(
        (item) => item.docId !== action.payload.docId
      );
    },
    
    // Reset the cart
    resetProductCart: (state) => {
      return initialCartState;
    },
  }
});

export const { addProductToCart, setProductToCart, increaseProductQuantity, decreaseProductQuantity, removeProductFromCart, resetProductCart } = UserCartSlice.actions;

export default UserCartSlice.reducer;
