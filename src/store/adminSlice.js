//src/store/adminSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

export const fetchAdminProfile = createAsyncThunk(
  "admin/fetchProfile",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/admin/me");
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to load admin profile");
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: { profile: null, loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchAdminProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
