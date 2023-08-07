import { createAsyncThunk } from "@reduxjs/toolkit";import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { api } from "../../axios.api";
import { IUser, UserAPI, signData } from "./type";

export const signIn = createAsyncThunk<
  signData,
  UserAPI.SigninForm,
  { rejectValue: string }
>("core/signIn", async function (data, thunkAPI) {
  try {
    const token = (await api.post("/auth/signIn", data)).data;

    toast.success("Вы успешно авторизовались");
    localStorage.setItem("token", token);
    return thunkAPI.fulfillWithValue(token);
  } catch (error) {
    const message = ((error as AxiosError).response?.data as Error).message;
    message.length < 5 ? toast.error(message[0]) : toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const signUp = createAsyncThunk<
  signData,
  UserAPI.SignupForm,
  { rejectValue: string }
>("core/signUp", async function (data, thunkAPI) {
  try {
    const { token, user } = (await api.post("/auth/signUp", data)).data;
    localStorage.setItem("token", token);
    toast.success("Вы успешно создали профиль");
    return thunkAPI.fulfillWithValue(user);
  } catch (error) {
    const message = ((error as AxiosError).response?.data as Error).message;
    message.length < 5 ? toast.error(message[0]) : toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const getMe = createAsyncThunk<IUser>(
  "core/getMyData",
  async function (_, thunkAPI) {
    try {
      return (await api.get("/users/me")).data;
    } catch (error) {
      const message = ((error as AxiosError).response?.data as Error).message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
