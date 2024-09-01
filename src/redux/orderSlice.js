import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  content: [],
  totalDoc: 0,
};

export const OrdersSlice = createSlice({
  name: "OrdersDetails",
  initialState: initialState,
  reducers: {
    setOrdersDetails: (state, action) => {
      state.content = action.payload;
      state.totalDoc = action.payload.length;
    },
    addOrderDetails: (state, action) => {
      state.content = [...state.content, action.payload]; // Use spread to add new product
      state.totalDoc += 1; // Increase totalDoc count
    },
    updateOrderDetails: (state, action) => {
      if (state?.totalDoc > 0 && Array.isArray(state.content)) {
        state.content = state.content.map((item) =>
          item.docId === action.payload.docId ? action.payload : item
        );
      }
    },
    removeOrderDetails: (state, action) => {
      if (state?.totalDoc > 0 && Array.isArray(state.content)) {
        state.content = state.content.filter(
          (item) => item.docId !== action.payload
        );
        state.totalDoc -= 1; // Decrease totalDoc count
      }
    },
    resetOrders: () => {
      return initialState;
    },
  },
});

export const {
  addOrderDetails,
  removeOrderDetails,
  resetOrders,
  setOrdersDetails,
  updateOrderDetails,
} = OrdersSlice.actions;

export default OrdersSlice.reducer;
