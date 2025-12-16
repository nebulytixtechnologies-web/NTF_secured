//src/store/managerSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

export const fetchManagerProfile = createAsyncThunk(
  "manager/fetchProfile",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/manager/me");
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to load manager profile");
    }
  }
);

const managerSlice = createSlice({
  name: "manager",
  initialState: { profile: null, loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchManagerProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchManagerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchManagerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default managerSlice.reducer;
