import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;

const initialState = {
  isAuthenticated: localStorage.getItem("isAuthenticated") || false,
  loading: false,
  token: localStorage.getItem("authToken") || null,
  data: localStorage.getItem("data")
    ? JSON.parse(localStorage.getItem("data"))
    : null,
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

      console.log(response.data.data.token);

      localStorage.setItem("authToken", response.data.data.token);
      localStorage.setItem("isAuthenticated", true);
      const { name, email } = response.data.data.user;
      localStorage.setItem("data", JSON.stringify({ name, email }));

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || { message: "Unknown error" }
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "users/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API}/users/logout`);
      localStorage.removeItem("authToken");
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("data");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "users/profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await toast.promise(axios.get(`${API}/users/profile`), {
        loading: "Hold on, we are fetching your profile",
        success: (res) => res?.data?.message,
        error: (err) => err?.response?.data?.message || "Something went wrong",
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

export const getPublicProfile = createAsyncThunk(
  "users/publicProfile",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await toast.promise(
        axios.get(`${API}/users/profile/${userId}`),
        {
          loading: "Hold on, we are fetching your profile",
          success: (res) => res?.data?.message,
          error: (err) =>
            err?.response?.data?.message || "Something went wrong",
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

export const updateBio = createAsyncThunk(
  "users/updateBio",
  async (bio, { rejectWithValue }) => {
    try {
      const response = await toast.promise(
        axios.patch(`${API}/users/profile`, bio),
        {
          loading: "Hold on, we are updating your bio",
          success: (res) => res?.data?.message,
          error: (err) =>
            err?.response?.data?.message || "Something went wrong",
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || { message: "Something went wrong" }
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
      //   register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //   login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.data = action.payload.data.user;
        state.token = action.payload.data.token;
        localStorage.setItem("authToken", action.payload.data.token);
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("data", JSON.stringify(action.payload.data.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.data = null;
        state.token = null;
        localStorage.removeItem("authToken");
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("data");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //   get user profile
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // public profile
      .addCase(getPublicProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPublicProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(getPublicProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //   update bio
      .addCase(updateBio.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBio.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(updateBio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
