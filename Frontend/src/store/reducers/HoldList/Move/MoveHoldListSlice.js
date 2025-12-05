import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchTrainees } from "../../Trainees/TraineesSlice";
import { fetchHoldlist } from "../HoldListSlice";

// Move to wait List
export const MoveToWaitList = createAsyncThunk(
  "moveHoldlist/MoveHoldToWaitList",
  async (id, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/holdlist/${id}/wait`
      );
      // Refetch holdlist data after successful move
      dispatch(fetchHoldlist());
      // Refetch trainees table to update status column
      dispatch(fetchTrainees({ branch: null, page: 1, per_page: 50 }));
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.response.data);
    }
  }
);

// Move bulk to Wait List
export const bulkMoveHoldToWaitList = createAsyncThunk(
  "moveHoldlist/bulkMoveHoldToWaitList",
  async (Userids, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/holdlist/wait`,
        Userids
      );
      // Refetch holdlist data after successful bulk move
      dispatch(fetchHoldlist());
      // Refetch trainees table to update status column
      dispatch(fetchTrainees({ branch: null, page: 1, per_page: 50 }));
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.response.data);
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
