import { createSlice } from "@reduxjs/toolkit";import * as coreActions from "./actions";
import { CoreState } from "./type";

const initialState: CoreState = {
  user: null,
  isSuccess: false,
  isError: false,
  isLoading: false,
  isAuth: false,
};

export const coreSlice = createSlice({
  name: "core",
  initialState,
  reducers: {
    clearstate(state) {
      state.user = null;
      state.isAuth = false;
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      localStorage.clear();
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(coreActions.signUp.pending, (state: CoreState) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(coreActions.signUp.fulfilled, (state: CoreState, action) => {
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
        state.isAuth = true;
      })
      .addCase(coreActions.signUp.rejected, (state: CoreState) => {
        state.isSuccess = false;
        state.isError = true;
        state.isLoading = false;
        state.isAuth = false;
      })
      .addCase(coreActions.signIn.pending, (state: CoreState) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(coreActions.signIn.fulfilled, (state: CoreState, action) => {
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
        state.isAuth = true;
      })
      .addCase(coreActions.signIn.rejected, (state: CoreState) => {
        state.user = null;
        state.isSuccess = false;
        state.isError = true;
        state.isLoading = false;
        state.isAuth = false;
      })
      .addCase(coreActions.getMe.pending, (state: CoreState) => {
        state.isLoading = true;
      })
      .addCase(coreActions.getMe.fulfilled, (state: CoreState, action) => {
        state.user = action.payload;
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.isAuth = true;
      })
      .addCase(coreActions.getMe.rejected, (state: CoreState) => {
        state.user = null;
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        state.isAuth = false;
      });
  },
});

export const { clearstate } = coreSlice.actions;

export const coreSelector = (state: { user: CoreState }) => state.user;
