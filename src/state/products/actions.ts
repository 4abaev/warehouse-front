import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { api } from "../../axios.api";

export const getProducts = createAsyncThunk(
  "products/getAll",
  async (_, thunkAPI) => {
    try {
      const products = (await api.get("/products")).data;

      return thunkAPI.fulfillWithValue(products);
    } catch (error) {
      const { message } = (error as AxiosError).response?.data as Error;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const createProduct = createAsyncThunk<
  Product,
  any,
  { rejectValue: string }
>("products/create", async (data, thunkAPI) => {
  try {
    const product = (
      await api.post("/products", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    ).data;
    toast.success("Товар загружен");

    return thunkAPI.fulfillWithValue(product);
  } catch (error) {
    const { message } = (error as AxiosError).response?.data as Error;
    console.log(error);

    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});
