import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get All WaitList
export const fetchWaitList = createAsyncThunk(
  "waitList/fetchWaitList",
  async (branch, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/waitlist`,
        { branch }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get All Trainer for waitList
export const fetchTrainerForWaitList = createAsyncThunk(
  "waitList/fetchTrainerForWaitList",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/dashboard/waitlist/view-trainers`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create Waitlist
export const createWaitlist = createAsyncThunk(
  "waitList/createWaitlist",
  async (user, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/dashboard/waitlist/create`,
        user
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update Waitlist
export const UpdateWaitList = createAsyncThunk(
  "waitList/updateWaitlist",
  async (user, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/waitlist/${user.id}/update`,
        user.data
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete a one Waitlist
export const DeleteWaitList = createAsyncThunk(
  "waitList/deleteWaitlist",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/dashboard/waitlist/${id}/delete`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Bulk delete Waitlist
export const bulkDeleteWaitList = createAsyncThunk(
  "waitList/bulkDeleteWaitlist",
  async (Userids, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/dashboard/waitlist/delete`,
        Userids
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const WaitListSlice = createSlice({
  name: "waitList",
  initialState: {
    waitList: [],
    trainers: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWaitList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWaitList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.waitList = action.payload;
      })
      .addCase(fetchWaitList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Get All Trainer for waitList
    builder
      .addCase(fetchTrainerForWaitList.fulfilled, (state, action) => {
        state.trainers = action.payload;
      })
      .addCase(fetchTrainerForWaitList.rejected, (state, action) => {
        state.error = action.payload;
      });

    // create a new Waitlist
    builder
      .addCase(createWaitlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createWaitlist.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createWaitlist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Update  Waitlist
    builder
      .addCase(UpdateWaitList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UpdateWaitList.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(UpdateWaitList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Delete  Waitlist
    builder.addCase(DeleteWaitList.rejected, (state, action) => {
      state.error = action.payload;
    });

    // Bulk delete Waitlist
    builder.addCase(bulkDeleteWaitList.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const { clearError } = WaitListSlice.actions;

export default WaitListSlice.reducer;
