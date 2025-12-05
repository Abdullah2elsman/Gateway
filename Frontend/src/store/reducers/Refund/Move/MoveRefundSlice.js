import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchRefundList } from "../RefundSlice";

// Move Refund to wait List
export const MoveRefundToWaitList = createAsyncThunk(
  "moveRefundlist/MoveRefundToWaitList",
  async (id, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/refundlist/${id}/wait`
      );
      // Refetch refundlist data after successful move
      dispatch(fetchRefundList());
      // Refetch trainees table to update status column
      dispatch(fetchTrainees({ branch: null, page: 1, per_page: 50 }));
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.response.data);
    }
  }
);

// Move bulk to Wait List
export const bulkMoveRefundToWaitList = createAsyncThunk(
  "moveRefundlist/bulkMoveRefundToWaitList",
  async (Userids, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/refundlist/wait`,
        Userids
      );
      // Refetch refundlist data after successful bulk move
      dispatch(fetchRefundList());
      // Refetch trainees table to update status column
      dispatch(fetchTrainees({ branch: null, page: 1, per_page: 50 }));
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.response.data);
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
