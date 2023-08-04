import { createSlice } from "@reduxjs/toolkit";
import * as costsActions from "./actions";

const initialState: ProductsState = {
  products: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
};

export const productsSlice = createSlice({
  name: "core",
  initialState,
  reducers: {
    clearstate(state) {
      state.products = [];
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      return state;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(costsActions.getProducts.pending, (state: ProductsState) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(costsActions.getProducts.fulfilled, (state: ProductsState, action) => {
        state.products = action.payload;
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(costsActions.getProducts.rejected, (state: ProductsState) => {
        state.isSuccess = false;
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(costsActions.createProduct.pending, (state: ProductsState) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(costsActions.createProduct.fulfilled, (state: ProductsState, action) => {
        state.products.push(action.payload);
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(costsActions.createProduct.rejected, (state: ProductsState) => {
        state.isSuccess = false;
        state.isError = true;
        state.isLoading = false;
      })
  },
});

export const { clearstate } = productsSlice.actions;

export const productsSelector = (state: { products: ProductsState }) => state.products;
