import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get All refundlist
export const fetchRefundList = createAsyncThunk(
  "refundlist/fetchRefundList",
  async (branch, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/refundlist`,
        { branch }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update refundlist
export const UpdateRefundList = createAsyncThunk(
  "refundlist/updateRefundList",
  async (user, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/refundlist/${
          user.id
        }/update`,
        user.data
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete a one refundlist
export const DeleteRefundList = createAsyncThunk(
  "refundlist/deleteRefundList",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/dashboard/refundlist/${id}/delete`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Bulk delete refundlist
export const bulkDeleteRefundList = createAsyncThunk(
  "refundlist/bulkDeleteRefundList",
  async (Userids, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/dashboard/refundlist/delete`,
        Userids
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const RefundListSlice = createSlice({
  name: "refundlist",
  initialState: {
    refundList: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRefundList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRefundList.fulfilled, (state, action) => {
        state.loading = false;
        state.refundList = action.payload;
      })
      .addCase(fetchRefundList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update  refundlist
    builder
      .addCase(UpdateRefundList.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdateRefundList.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(UpdateRefundList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete  refundlist
    builder.addCase(DeleteRefundList.rejected, (state, action) => {
      state.error = action.payload;
    });

    // Bulk delete refundlist
    builder.addCase(bulkDeleteRefundList.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const { clearError } = RefundListSlice.actions;

export default RefundListSlice.reducer;
