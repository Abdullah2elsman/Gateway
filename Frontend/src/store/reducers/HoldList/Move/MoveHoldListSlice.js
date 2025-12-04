import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Move to wait List
export const MoveToWaitList = createAsyncThunk(
  "moveHoldlist/MoveHoldToWaitList",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/holdlist/${id}/wait`
      );
      return res.data;
    } catch (error) {
      rejectWithValue(error.response.data.message || error.response.data);
    }
  }
);

// Move bulk to Wait List
export const bulkMoveHoldToWaitList = createAsyncThunk(
  "moveHoldlist/bulkMoveHoldToWaitList",
  async (Userids, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/holdlist/wait`,
        Userids
      );
      return res.data;
    } catch (error) {
      rejectWithValue(error.response.data.message || error.response.data);
    }
  }
);

const MoveHoldListSlice = createSlice({
  name: "moveholdlist",
  initialState: {
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Move to Wait List
    builder.addCase(MoveToWaitList.rejected, (state, action) => {
      state.error = action.payload;
    });

    // Move bulk to Wait List
    builder.addCase(bulkMoveHoldToWaitList.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export default MoveHoldListSlice.reducer;
