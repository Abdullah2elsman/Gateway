import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch Time Slots in Classes

export const fetchTimeSlotsInClass = createAsyncThunk(
  "timeSlotsClasses/fetchTimeSlotsInClass",
  async (attend_type, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/batches/classes/time-slots`,
        { attend_type }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Create Time Slot in Class

export const createTimeSlotInClass = createAsyncThunk(
  "timeSlotsClasses/createTimeSlotInClass",
  async (timeSlot, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `${
          import.meta.env.VITE_API_URL
        }/dashboard/batches/classes/time-slot/add`,
        timeSlot
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const TimeSlotsSlice = createSlice({
  name: "timeSlotsClasses",
  initialState: {
    isLoading: false,
    error: null,
    timeSlots_classes: [],
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTimeSlotsInClass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.timeSlots_classes = action.payload;
      })
      .addCase(fetchTimeSlotsInClass.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // create a new timeslot class
    builder
      .addCase(createTimeSlotInClass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTimeSlotInClass.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createTimeSlotInClass.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = TimeSlotsSlice.actions;

export default TimeSlotsSlice.reducer;
