import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Move black to wait List
export const MoveBlackToWaitList = createAsyncThunk(
  "moveBlacklist/MoveBlackToWaitList",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/blacklist/${id}/wait`
      );
      return res.data;
    } catch (error) {
      rejectWithValue(error.response.data.message || error.response.data);
    }
  }
);

// Move black to Wait List
export const bulkMoveBlackToWaitList = createAsyncThunk(
  "moveBlacklist/bulkMoveBlackToWaitList",
  async (Userids, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/blacklist/wait`,
        Userids
      );
      return res.data;
    } catch (error) {
      rejectWithValue(error.response.data.message || error.response.data);
    }
  }
);

const MoveHoldListSlice = createSlice({
  name: "moveBlacklist",
  initialState: {
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Move black to Wait List
    builder.addCase(MoveBlackToWaitList.rejected, (state, action) => {
      state.error = action.payload;
    });

    // Move bulk black to Wait List
    builder.addCase(bulkMoveBlackToWaitList.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export default MoveHoldListSlice.reducer;
