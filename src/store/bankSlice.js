//src/store/bankSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../api/axiosInstance";

// /* ================= FETCH BANK ================= */

// export const fetchEmployeeBank = createAsyncThunk(
//   "bank/fetchEmployeeBank",
//   async (employeeId, thunkAPI) => {
//     try {
//       const res = await axiosInstance.get(
//         `/employee/get/${employeeId}/bank-detail`
//       );
//       return res.data.data;
//     } catch (err) {
//       if (err.response?.status === 404) return null;
//       return thunkAPI.rejectWithValue("Failed to fetch bank details");
//     }
//   }
// );

// /* ================= ADD BANK ================= */

// export const addEmployeeBank = createAsyncThunk(
//   "bank/addEmployeeBank",
//   async ({ employeeId, payload }, thunkAPI) => {
//     try {
//       const res = await axiosInstance.post(
//         `/hr/add/bank-details/${employeeId}`,
//         payload
//       );
//       return res.data.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue("Failed to add bank details");
//     }
//   }
// );

// /* ================= UPDATE BANK ================= */

// export const updateEmployeeBank = createAsyncThunk(
//   "bank/updateEmployeeBank",
//   async ({ employeeId, payload }, thunkAPI) => {
//     try {
//       const res = await axiosInstance.put(
//         `/hr/update/${employeeId}/bank-details`,
//         payload
//       );
//       return res.data.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue("Failed to update bank details");
//     }
//   }
// );

// const bankSlice = createSlice({
//   name: "bank",
//   initialState: {
//     loading: false,
//     error: null,
//     bank: null,
//   },
//   reducers: {
//     clearBankState: (state) => {
//       state.bank = null;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchEmployeeBank.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchEmployeeBank.fulfilled, (state, action) => {
//         state.loading = false;
//         state.bank = action.payload;
//       })
//       .addCase(fetchEmployeeBank.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(addEmployeeBank.fulfilled, (state, action) => {
//         state.bank = action.payload;
//       })
//       .addCase(updateEmployeeBank.fulfilled, (state, action) => {
//         state.bank = action.payload;
//       });
//   },
// });

// export const { clearBankState } = bankSlice.actions;
// export default bankSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

/* ================= FETCH BANK ================= */

export const fetchEmployeeBank = createAsyncThunk(
  "bank/fetchEmployeeBank",
  async (employeeId, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `/employee/get/${employeeId}/bank-detail`
      );
      return res.data.data;
    } catch (err) {
      if (err.response?.status === 404) return null;
      return thunkAPI.rejectWithValue("Failed to fetch bank details");
    }
  }
);

/* ================= ADD BANK ================= */

export const addEmployeeBank = createAsyncThunk(
  "bank/addEmployeeBank",
  async ({ employeeId, payload }, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        `/hr/add/bank-details/${employeeId}`,
        payload
      );
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to add bank details");
    }
  }
);

/* ================= UPDATE BANK ================= */

export const updateEmployeeBank = createAsyncThunk(
  "bank/updateEmployeeBank",
  async ({ employeeId, payload }, thunkAPI) => {
    try {
      const res = await axiosInstance.put(
        `/hr/update/${employeeId}/bank-details`,
        payload
      );
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to update bank details");
    }
  }
);

const bankSlice = createSlice({
  name: "bank",
  initialState: {
    loading: false,
    error: null,
    bank: null,
  },
  reducers: {
    clearBankState: (state) => {
      state.bank = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeeBank.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployeeBank.fulfilled, (state, action) => {
        state.loading = false;
        state.bank = action.payload;
      })
      .addCase(fetchEmployeeBank.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addEmployeeBank.fulfilled, (state, action) => {
        state.bank = action.payload;
      })
      .addCase(updateEmployeeBank.fulfilled, (state, action) => {
        state.bank = action.payload;
      });
  },
});

export const { clearBankState } = bankSlice.actions;
export default bankSlice.reducer;
