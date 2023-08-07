import { createSlice } from "@reduxjs/toolkit";
import * as costsActions from "./actions";

const initialState: ProductsState = {
  products: [],
  currentProduct: null,
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
    },
    setCurrent(state, action) {
      state.isSuccess = false;
      state.currentProduct = action.payload
      return state
    },
    setSuccesFalse(state) {
      state.isSuccess = false;
      return state
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
        console.log(state.products);
        
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
      .addCase(costsActions.deleteProduct.pending, (state: ProductsState) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(costsActions.deleteProduct.fulfilled, (state: ProductsState, action) => {
        state.products = state.products.filter((product) => {
          return product.id !== action.payload.id
        });
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(costsActions.deleteProduct.rejected, (state: ProductsState) => {
        state.isSuccess = false;
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(costsActions.updateProduct.pending, (state: ProductsState) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(costsActions.updateProduct.fulfilled, (state: ProductsState, action) => {
        state.products = state.products.filter((product) => {
          return product.id !== action.payload.id
        });
        state.products.push(action.payload)
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(costsActions.updateProduct.rejected, (state: ProductsState) => {
        state.isSuccess = false;
        state.isError = true;
        state.isLoading = false;
      })
  },
});

export const { clearstate, setCurrent, setSuccesFalse } = productsSlice.actions;

export const productsSelector = (state: { products: ProductsState }) => state.products;
