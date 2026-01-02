//src/store/adminSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import { fetchAdmins } from "./userListsSlice";

/* ================= FETCH ADMIN PROFILE ================= */

export const fetchAdminProfile = createAsyncThunk(
  "admin/fetchProfile",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/admin/me");
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to load admin profile"
      );
    }
  }
);

/* ================= DELETE ADMIN ================= */

export const deleteAdminById = createAsyncThunk(
  "admin/deleteAdmin",
  async (adminId, thunkAPI) => {
    try {
      await axiosInstance.delete(`/admin/delete/admin/${adminId}`);
      thunkAPI.dispatch(fetchAdmins()); // refresh list
      return adminId;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to delete admin"
      );
    }
  }
);

/* ================= ENABLE ADMIN ================= */

export const enableAdmin = createAsyncThunk(
  "admin/enableAdmin",
  async (adminId, thunkAPI) => {
    try {
      await axiosInstance.put(`/admin/${adminId}/enable`);
      thunkAPI.dispatch(fetchAdmins());
      return adminId;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to enable admin");
    }
  }
);

/* ================= DISABLE ADMIN ================= */

export const disableAdmin = createAsyncThunk(
  "admin/disableAdmin",
  async (adminId, thunkAPI) => {
    try {
      await axiosInstance.put(`/admin/${adminId}/disable`);
      thunkAPI.dispatch(fetchAdmins());
      return adminId;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to disable admin");
    }
  }
);

/* ================= SLICE ================= */

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {},
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
