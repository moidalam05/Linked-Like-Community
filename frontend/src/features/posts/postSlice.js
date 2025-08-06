import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

// 📌 Create Post
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await toast.promise(
        axios.post(`${API}/posts`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          withCredentials: true,
        }),
        {
          loading: "Hold on, we are creating your post",
          success: (res) => res?.data?.message,
          error: (err) =>
            err?.response?.data?.message || "Something went wrong",
        }
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

// 📌 Get All Posts
export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await toast.promise(axios.get(`${API}/posts`), {
        error: (err) => err?.response?.data?.message || "Something went wrong",
      });

      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await toast.promise(
        axios.delete(`${API}/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          withCredentials: true,
        }),
        {
          loading: "Hold on, we are deleting your post",
          success: (res) => res?.data?.message,
          error: (err) =>
            err?.response?.data?.message || "Something went wrong",
        }
      );

      response.data;
      return postId;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Post
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to create post";
      })

      // Get Posts
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.data || [];
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to load posts";
      })

      //   delete post
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;

        console.log(action.payload);

        if (Array.isArray(state.posts)) {
          state.posts = state.posts.filter(
            (post) => post._id !== action.payload
          );
        } else {
          console.error("state.posts is not an array:", state.posts);
          state.posts = [];
        }
      })

      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to delete post";
      });
  },
});

export default postSlice.reducer;
