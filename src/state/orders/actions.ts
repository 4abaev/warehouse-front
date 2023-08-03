import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { api } from "../../axios.api";

export const getOrders = createAsyncThunk(
  "orders/getAll",
  async (_, thunkAPI) => {
    try {
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;
      const orders = (await api.get("/orders")).data;
      return thunkAPI.fulfillWithValue(orders);
    } catch (error) {
      const { message } = ((error as AxiosError).response?.data as Error);
      toast.error(message);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (data: OrderCreateForm, thunkAPI) => {
    try {
      const order = (await api.post("/orders", data)).data;
      toast.success(`Создан заказ ${order.text}`);
      return thunkAPI.fulfillWithValue(order);
    } catch (error) {
      const { message } = ((error as AxiosError).response?.data as Error);
      toast.error(message);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
