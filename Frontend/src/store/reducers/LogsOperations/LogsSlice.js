import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ===================== GET BRANCH LOGS (TRANSITIONS) =====================
export const fetchBranchLogs = createAsyncThunk(
  "logs/fetchBranchLogs",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/dashboard/transitions`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const logsSlice = createSlice({
  name: "logs",
  initialState: {
    logs: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // --------------------- FETCH BRANCH LOGS ---------------------
    builder
      .addCase(fetchBranchLogs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBranchLogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.logs = action.payload.transitions || []; 
      })
      .addCase(fetchBranchLogs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = logsSlice.actions;
export default logsSlice.reducer;
