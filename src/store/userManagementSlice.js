import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

// ADMIN
export const addAdmin = createAsyncThunk(
  "users/addAdmin",
  async (payload, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/admin/create", payload);
      return res.data.message;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to add admin"
      );
    }
  }
);

// EMPLOYEE / HR / MANAGER
export const addEmployee = createAsyncThunk(
  "users/addEmployee",
  async ({ role, data }, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`/admin/create-${role}`, data);
      return res.data.message;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to add employee"
      );
    }
  }
);

// CLIENT
export const addClient = createAsyncThunk(
  "users/addClient",
  async (payload, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/admin/create-client", payload);
      return res.data.message;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to add client"
      );
    }
  }
);

const userManagementSlice = createSlice({
  name: "userManagement",
  initialState: {
    loading: false,
    success: null,
    error: null,
  },
  reducers: {
    clearStatus: (state) => {
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (a) => a.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (a) => a.type.endsWith("/fulfilled"),
        (state, action) => {
          state.loading = false;
          state.success = action.payload;
        }
      )
      .addMatcher(
        (a) => a.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { clearStatus } = userManagementSlice.actions;
export default userManagementSlice.reducer;
