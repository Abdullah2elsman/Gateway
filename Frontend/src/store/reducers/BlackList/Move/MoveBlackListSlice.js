import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchBlackList } from "../BlackListSlice";

// Move black to wait List
export const MoveBlackToWaitList = createAsyncThunk(
  "moveBlacklist/MoveBlackToWaitList",
  async (id, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/blacklist/${id}/wait`
      );
      // Refetch blacklist data after successful move
      dispatch(fetchBlackList());
      // Refetch trainees table to update status column
      dispatch(fetchTrainees({ branch: null, page: 1, per_page: 50 }));
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.response.data);
    }
  }
);

// Move black to Wait List
export const bulkMoveBlackToWaitList = createAsyncThunk(
  "moveBlacklist/bulkMoveBlackToWaitList",
  async (Userids, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/blacklist/wait`,
        Userids
      );
      // Refetch blacklist data after successful bulk move
      dispatch(fetchBlackList());
      // Refetch trainees table to update status column
      dispatch(fetchTrainees({ branch: null, page: 1, per_page: 50 }));
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.response.data);
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
