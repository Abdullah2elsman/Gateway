import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get All Attendance
export const fetchAttendance = createAsyncThunk(
  "attendance/fetchAttendance",
  async (class_id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/dashboard/batches/classes/${
          class_id.class_id
        }/attendance`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// create a new Trainer note and comment for Attendance
export const createTrainerNote = createAsyncThunk(
  "attendance/createTrainerNote",
  async ({ class_id, trainee_id, trainer_note, comment }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${
          import.meta.env.VITE_API_URL
        }/dashboard/batches/${class_id}/classes/${trainee_id}/add-trainer-note`,
        { trainer_note, comment }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//  fetch all attendance for trainer
export const fetchAttendanceTrainer = createAsyncThunk(
  "attendance/fetchAttendanceTrainer",
  async (class_id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/dashboard/attendances`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const AttendanceSlice = createSlice({
  name: "attendance",
  initialState: {
    attendance: [],
    trainer_attendance: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttendance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAttendance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.attendance = action.payload;
      })
      .addCase(fetchAttendance.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    //  fetch all attendance for trainer
    builder
      .addCase(fetchAttendanceTrainer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAttendanceTrainer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.trainer_attendance = action.payload;
      })
      .addCase(fetchAttendanceTrainer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // create a new Trainer note
    builder
      .addCase(createTrainerNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTrainerNote.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createTrainerNote.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = AttendanceSlice.actions;

export default AttendanceSlice.reducer;
