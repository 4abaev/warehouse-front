import { createSlice } from "@reduxjs/toolkit";import * as ordersActions from "./actions";
import { usersSlice } from "../users/slice";
const initialState: OrdersState = {
  orders: [],
  isError: false,
  isOrderSucces: false,
  isLoading: false,
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearState(state) {
      state.orders = [];
      state.isError = false;
      state.isOrderSucces = false;
      state.isLoading = false;
      return state;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(ordersActions.getOrders.pending, (state: OrdersState) => {
        state.isError = false;
        state.isOrderSucces = false;
        state.isLoading = true;
      })
      .addCase(
        ordersActions.getOrders.fulfilled,
        (state: OrdersState, action) => {
          state.orders = action.payload;
          state.isError = false;
          state.isOrderSucces = true;
          state.isLoading = false;
        }
      )
      .addCase(ordersActions.getOrders.rejected, (state: OrdersState) => {
        state.isError = false;
        state.isOrderSucces = false;
        state.isLoading = true;
      })
      .addCase(ordersActions.createOrder.pending, (state: OrdersState) => {
        state.isError = false;
        state.isOrderSucces = false;
        state.isLoading = true;
      })
      .addCase(
        ordersActions.createOrder.fulfilled,
        (state: OrdersState, action) => {
          state.orders.push(action.payload);
          state.isError = false;
          state.isOrderSucces = true;
          state.isLoading = false;
        }
      )
      .addCase(ordersActions.createOrder.rejected, (state: OrdersState) => {
        state.isError = false;
        state.isOrderSucces = false;
        state.isLoading = true;
      });
  },
});

export const { clearState } = usersSlice.actions;

export const ordersSelector = (state: { orders: OrdersState }) => state.orders;
