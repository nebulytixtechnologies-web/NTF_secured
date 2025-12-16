//src/store/employeeSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

export const fetchEmployeeProfile = createAsyncThunk(
  "employee/fetchProfile",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/employee/me");
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to load employee profile");
    }
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState: { profile: null, loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeeProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployeeProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchEmployeeProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default employeeSlice.reducer;
