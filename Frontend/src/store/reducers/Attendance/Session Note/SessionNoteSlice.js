import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get All Session note
export const fetchSessionNote = createAsyncThunk(
  "session_note/fetchSessionNote",
  async ({ class_id, trainee_id }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/dashboard/batches/classes/${class_id}/attendance/${trainee_id}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// create a new session note for Attendance
export const createSessionNote = createAsyncThunk(
  "session_note/createSessionNote",
  async ({ class_id, trainee_id, session_title }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `${
          import.meta.env.VITE_API_URL
        }/dashboard/batches/classes/${class_id}/attendance/${trainee_id}`,
        { session_title }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// update a session note
export const updateSessionNote = createAsyncThunk(
  "session_note/updateSessionNote",
  async ({ session_id, session_title, session_status }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${
          import.meta.env.VITE_API_URL
        }/dashboard/batches/classes/attendance/${session_id}`,
        { session_title, session_status }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const SessionNoteSlice = createSlice({
  name: "session_note",
  initialState: {
    Sessions: [],
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
      .addCase(fetchSessionNote.fulfilled, (state, action) => {
        state.Sessions = action.payload;
      })
      .addCase(fetchSessionNote.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // create a new session note
    builder
      .addCase(createSessionNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSessionNote.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createSessionNote.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // update a session note
    builder
      .addCase(updateSessionNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSessionNote.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateSessionNote.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = SessionNoteSlice.actions;

export default SessionNoteSlice.reducer;
