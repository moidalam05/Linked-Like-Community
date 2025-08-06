import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_BASE_URL;

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  token: localStorage.getItem("authToken") || null,
  data: JSON.parse(localStorage.getItem("data")) || null,
  error: null,
};

export const registerUser = createAsyncThunk(
  "users/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await toast.promise(
        axios.post(`${API}/users/register`, userData),
        {
          loading: "Hold on, we are creating your account",
          success: (res) => res?.data?.message,
          error: (err) =>
            err?.response?.data?.message || "Something went wrong",
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || { message: "Unknown error" }
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await toast.promise(
        axios.post(`${API}/users/login`, userData),
        {
          loading: "Hold on, we are creating your account",
          success: (res) => res?.data?.message,
          error: (err) =>
            err?.response?.data?.message || "Something went wrong",
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || { message: "Unknown error" }
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
