import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Bulk class to Wait
export const BulkClassToWait = createAsyncThunk(
  "bulkClass/BulkClassToWait",
  async ({ class_id, trainees }, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL
        }/dashboard/batches/${class_id}/classes/move-to-wait`,
        { trainees }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Bulk class to hold
export const BulkClassToHold = createAsyncThunk(
  "bulkClass/BulkClassToHold",
  async ({ class_id, trainees }, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL
        }/dashboard/batches/${class_id}/classes/move-to-hold`,
        { trainees }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Bulk class to refund
export const BulkClassToRefund = createAsyncThunk(
  "bulkClass/BulkClassToRefund",
  async ({ class_id, trainees }, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL
        }/dashboard/batches/${class_id}/classes/move-to-refund`,
        { trainees }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Bulk class to Black
export const BulkClassToBlack = createAsyncThunk(
  "bulkClass/BulkClassToBlack",
  async ({ class_id, trainees }, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL
        }/dashboard/batches/${class_id}/classes/move-to-black`,
        { trainees }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Bulk class to switch class
export const BulkClassSwitchClass = createAsyncThunk(
  "bulkClass/BulkClassSwitchClass",
  async (trainees, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL
        }/dashboard/batches/classes/switch-class`,
        trainees
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const BulkClassSlice = createSlice({
  name: "bulkClass",
  initialState: {
    classes: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(BulkClassToWait.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(BulkClassToHold.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(BulkClassToRefund.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(BulkClassToBlack.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder
      .addCase(BulkClassSwitchClass.pending, (state) => {
        state.loading = true;
      })
      .addCase(BulkClassSwitchClass.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(BulkClassSwitchClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = BulkClassSlice.actions;

export default BulkClassSlice.reducer;
