import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { api } from "../../axios.api";

export const getUsers = createAsyncThunk(
  "users/getAll",
  async (_, thunkAPI) => {
    try {
      const users = (await api.get('/users')).data;
      return thunkAPI.fulfillWithValue(users)
    } catch (error) {
      const { message } = ((error as AxiosError).response?.data as Error);
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
