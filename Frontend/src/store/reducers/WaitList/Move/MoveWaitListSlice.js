import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchTrainees } from "../../Trainees/TraineesSlice";
import { fetchWaitList } from "../WaitListSlice";

// Move to Hold List
export const MoveToHoldList = createAsyncThunk(
  "moveWaitlist/moveToHoldList",
  async (id, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/waitlist/${id}/hold`
      );
      // Refetch waitlist data after successful move
      dispatch(fetchWaitList());
      // Refetch trainees table to update status column
      dispatch(fetchTrainees({ branch: null, page: 1, per_page: 50 }));
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.response.data);
    }
  }
);

// Move to Refund List
export const MoveToRefundList = createAsyncThunk(
  "moveWaitlist/moveToRefundList",
  async (id, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/waitlist/${id}/refund`
      );
      // Refetch waitlist data after successful move
      dispatch(fetchWaitList());
      // Refetch trainees table to update status column
      dispatch(fetchTrainees({ branch: null, page: 1, per_page: 50 }));
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.response.data);
    }
  }
);

// Move to Black List
export const MoveToBlackList = createAsyncThunk(
  "moveWaitlist/moveToBlackList",
  async (id, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/waitlist/${id}/black`
      );
      // Refetch waitlist data after successful move
      dispatch(fetchWaitList());
      // Refetch trainees table to update status column
      dispatch(fetchTrainees({ branch: null, page: 1, per_page: 50 }));
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.response.data);
    }
  }
);

// Move bulk to Hold List
export const bulkMoveHoldList = createAsyncThunk(
  "moveWaitlist/bulkMoveHoldList",
  async (Userids, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/waitlist/hold`,
        Userids
      );
      // Refetch waitlist data after successful bulk move
      dispatch(fetchWaitList());
      // Refetch trainees table to update status column
      dispatch(fetchTrainees({ branch: null, page: 1, per_page: 50 }));
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.response.data);
    }
  }
);

// Move bulk to Refund List
export const bulkMoveRefundList = createAsyncThunk(
  "moveWaitlist/bulkMoveRefundList",
  async (Userids, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/waitlist/refund`,
        Userids
      );
      // Refetch waitlist data after successful bulk move
      dispatch(fetchWaitList());
      // Refetch trainees table to update status column
      dispatch(fetchTrainees({ branch: null, page: 1, per_page: 50 }));
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.response.data);
    }
  }
);

// Move bulk to Black List
export const bulkMoveBlackList = createAsyncThunk(
  "moveWaitlist/bulkMoveBlackList",
  async (Userids, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/waitlist/black`,
        Userids
      );
      // Refetch waitlist data after successful bulk move
      dispatch(fetchWaitList());
      // Refetch trainees table to update status column
      dispatch(fetchTrainees({ branch: null, page: 1, per_page: 50 }));
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.response.data);
    }
  }
);

const MoveWaitlistSlice = createSlice({
  name: "moveWaitlist",
  initialState: {
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Move to Hold List
    builder.addCase(MoveToHoldList.rejected, (state, action) => {
      state.error = action.payload;
    });

    // Move to Refund List
    builder.addCase(MoveToRefundList.rejected, (state, action) => {
      state.error = action.payload;
    });

    // Move to Black List
    builder.addCase(MoveToBlackList.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export default MoveWaitlistSlice.reducer;
