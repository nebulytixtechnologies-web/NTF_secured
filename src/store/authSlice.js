// src/store/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_BASE_URL } from "../api/config";
import { logoutApi } from "../api/auth";

/**
 * refreshToken thunk — calls backend /auth/refresh-token (cookie-based)
 * Returns the new access token string on success.
 */
export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, thunkAPI) => {
    try {
      const res = await axios.post(
        `${BACKEND_BASE_URL}/auth/refresh-token`,
        {},
        { withCredentials: true }
      );

      // backend response: res.data.data.accessToken
      const newToken = res.data?.data?.accessToken;

      if (!newToken) {
        return thunkAPI.rejectWithValue("No new access token received");
      }

      return newToken;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || "Failed to refresh token"
      );
    }
  }
);

/**
 * logoutUser thunk — call backend logout to delete refresh token (cookie)
 */
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      await logoutApi(); // will send cookie (withCredentials required in auth.logoutApi)
      return true;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || "Logout failed. Please try again."
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
    userDashboard: null,
    roles: [],
  },
  reducers: {
    setAuthData: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.userDashboard = action.payload.dashboard;
      state.roles = action.payload.roles;
    },
    clearAuth: (state) => {
      state.accessToken = null;
      state.userDashboard = null;
      state.roles = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload; // new access token
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.accessToken = null;
        state.userDashboard = null;
        state.roles = [];
      });
  },
});

export const { setAuthData, clearAuth } = authSlice.actions;
export default authSlice.reducer;
