import { createSlice } from "@reduxjs/toolkit";
import * as costsActions from "./actions";

const initialState: CostsState = {
  costs: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
};

export const costsSlice = createSlice({
  name: "core",
  initialState,
  reducers: {
    clearstate(state) {
      state.costs = [];
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      return state;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(costsActions.getCosts.pending, (state: CostsState) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(costsActions.getCosts.fulfilled, (state: CostsState, action) => {
        state.costs = action.payload;
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(costsActions.getCosts.rejected, (state: CostsState) => {
        state.isSuccess = false;
        state.isError = true;
        state.isLoading = false;
      })
  },
});

export const { clearstate } = costsSlice.actions;

export const costsSelector = (state: { costs: CostsState }) => state.costs;
