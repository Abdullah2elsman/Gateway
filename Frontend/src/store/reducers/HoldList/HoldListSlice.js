import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Get All holdlist
export const fetchHoldlist = createAsyncThunk(
  "holdlist/fetchHoldlist",
  async (branch, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/holdlist`,
        { branch }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update holdlist
export const UpdateHoldList = createAsyncThunk(
  "holdlist/updateHoldList",
  async (trainee, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/holdlist/${trainee.id
        }/update`,
        trainee.data
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete a one holdlist
export const DeleteHoldList = createAsyncThunk(
  "holdlist/deleteHoldList",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/dashboard/holdlist/${id}/delete`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Bulk delete holdlist
export const bulkDeleteHoldList = createAsyncThunk(
  "holdlist/bulkDeleteHoldList",
  async (Userids, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/dashboard/holdlist/delete`,
        Userids
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const HoldListSlice = createSlice({
  name: "holdlist",
  initialState: {
    holdList: [],
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
      .addCase(fetchHoldlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHoldlist.fulfilled, (state, action) => {
        state.loading = false;
        state.holdList = action.payload;
      })
      .addCase(fetchHoldlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update  holdList
    builder
      .addCase(UpdateHoldList.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdateHoldList.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(UpdateHoldList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete  holdList
    builder.addCase(DeleteHoldList.fulfilled, (state) => {
      state.error = null;
    });
    builder.addCase(DeleteHoldList.rejected, (state, action) => {
      state.error = action.payload;
    });

    // Bulk delete holdList
    builder.addCase(bulkDeleteHoldList.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const { clearError } = HoldListSlice.actions;

export default HoldListSlice.reducer;
