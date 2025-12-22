//src/store/hrEmployeeSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

/* ================= HR ADD EMPLOYEE ================= */

export const hrAddEmployee = createAsyncThunk(
  "hrEmployee/addEmployee",
  async (payload, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        "/hr/create-employee",
        payload
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to add employee"
      );
    }
  }
);

const hrEmployeeSlice = createSlice({
  name: "hrEmployee",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearHrStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hrAddEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(hrAddEmployee.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(hrAddEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearHrStatus } = hrEmployeeSlice.actions;
export default hrEmployeeSlice.reducer;
