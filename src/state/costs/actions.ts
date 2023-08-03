import { createAsyncThunk } from "@reduxjs/toolkit";import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { api } from "../../axios.api";

export const getCosts = createAsyncThunk(
  "costs/getAll",
  async (_, thunkAPI) => {
    try {
      const costs = (await api.get("/costs")).data;
      return thunkAPI.fulfillWithValue(costs)
    } catch (error) {
      const { message } = ((error as AxiosError).response?.data as Error);
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
