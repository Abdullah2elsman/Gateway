import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Move Refund to wait List
export const MoveRefundToWaitList = createAsyncThunk(
  "moveRefundlist/MoveRefundToWaitList",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/refundlist/${id}/wait`
      );
      return res.data;
    } catch (error) {
      rejectWithValue(error.response.data.message || error.response.data);
    }
  }
);

// Move bulk to Wait List
export const bulkMoveRefundToWaitList = createAsyncThunk(
  "moveRefundlist/bulkMoveRefundToWaitList",
  async (Userids, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/refundlist/wait`,
        Userids
      );
      return res.data;
    } catch (error) {
      rejectWithValue(error.response.data.message || error.response.data);
    }
  }
);

const MoveHoldListSlice = createSlice({
  name: "moveRefundlist",
  initialState: {
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {

    // Move refund to Wait List
    builder.addCase(MoveRefundToWaitList.rejected, (state, action) => {
      state.error = action.payload;
    });

    // Move bulk refund to Wait List
    builder.addCase(bulkMoveRefundToWaitList.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export default MoveHoldListSlice.reducer;
