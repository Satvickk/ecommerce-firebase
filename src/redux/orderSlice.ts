import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderState, Order } from "../types";

const initialState: OrderState = {
  content: [],
  totalDoc: 0,
};

export const OrdersSlice = createSlice({
  name: "OrdersDetails",
  initialState,
  reducers: {
    setOrdersDetails: (state, action: PayloadAction<Order[]>) => {
      state.content = [...action.payload];
      state.totalDoc = action.payload.length;
    },
    addOrderDetails: (state, action: PayloadAction<Order>) => {
      state.content = [...state.content, action.payload];
      state.totalDoc += 1;
    },
    updateOrderDetails: (state, action: PayloadAction<Order>) => {
      if (state.totalDoc > 0 && Array.isArray(state.content)) {
        state.content = state.content.map((item) =>
          item.docId === action.payload.docId ? action.payload : item
        );
      }
    },
    removeOrderDetails: (state, action: PayloadAction<string>) => {
      if (state.totalDoc > 0 && Array.isArray(state.content)) {
        state.content = state.content.filter(
          (item) => item.docId !== action.payload
        );
        state.totalDoc = Math.max(0, state.totalDoc - 1);
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
