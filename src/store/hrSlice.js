//src/store/hrSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

export const fetchHrProfile = createAsyncThunk(
  "hr/fetchProfile",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/hr/me");
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to load HR profile");
    }
  }
);

const hrSlice = createSlice({
  name: "hr",
  initialState: { profile: null, loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHrProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHrProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchHrProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default hrSlice.reducer;
