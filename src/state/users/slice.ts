import { createSlice } from "@reduxjs/toolkit";
import * as userActions from "./actions";

const initialState: UsersState = {
  users: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearState(state) {
      state.users = [];
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      return state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userActions.getUsers.pending, (state: UsersState) => {
        state.isError = false;
        state.isSuccess = false;
        state.isLoading = true;
      })
      .addCase(userActions.getUsers.fulfilled, (state: UsersState, action) => {
        state.users = action.payload;
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(userActions.getUsers.rejected, (state: UsersState) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      });
  },
});

export const { clearState } = usersSlice.actions;

export const usersSelector = (state: { users: UsersState }) => state.users;
