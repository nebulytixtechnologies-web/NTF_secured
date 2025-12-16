//src/store/clientSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

export const fetchClientProfile = createAsyncThunk(
  "client/fetchProfile",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/client/me");
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to load client profile");
    }
  }
);

const clientSlice = createSlice({
  name: "client",
  initialState: { profile: null, loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClientProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchClientProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default clientSlice.reducer;
