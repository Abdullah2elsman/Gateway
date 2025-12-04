import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get All time slot AssignClass
export const fetchTimeSlotAssignClass = createAsyncThunk(
  "assignClass/fetchTimeSlotAssignClass",
  async ({ trainee_id, attend_type, trainees }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL
        }/dashboard/waitlist/class/view-classes-times`,
        { trainee_id, attend_type, trainees }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get All level AssignClass
export const fetchLevelAssignClass = createAsyncThunk(
  "assignClass/fetchLevelAssignClass",
  async ({ trainee_id, trainees }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL
        }/dashboard/waitlist/class/view-classes-levels`,
        { trainee_id, trainees }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get All classes AssignClass
export const updateClassesAssignClass = createAsyncThunk(
  "assignClass/updateClassesAssignClass",
  async (Class, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/waitlist/class/view-classes`,
        Class
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// create  assignClass
export const createAssignClass = createAsyncThunk(
  "assignClass/createAssignClass",
  async (trainee, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/dashboard/waitlist/${trainee.id
        }/assign-class`,
        { class_id: trainee.class_id }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Move bulk to Black List
export const bulkAssignClass = createAsyncThunk(
  "assignClass/bulkAssignClass",
  async (trainees, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/dashboard/waitlist/assign-class`,
        trainees
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



const AssignClassSlice = createSlice({
  name: "assignClass",
  initialState: {
    level: [],
    timeSlot: [],
    classes: [],
    selectAllIds: [],
    error: null,
    loading: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTimeSlotAssignClass.fulfilled, (state, action) => {
        state.timeSlot = action.payload;
      })
      .addCase(fetchTimeSlotAssignClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get All level AssignClass
    builder
      .addCase(fetchLevelAssignClass.fulfilled, (state, action) => {
        state.level = action.payload;
      })
      .addCase(fetchLevelAssignClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get All classes AssignClass
    builder
      .addCase(updateClassesAssignClass.fulfilled, (state, action) => {
        state.classes = action.payload;
      })
      .addCase(updateClassesAssignClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // create  assignClass
    builder
      .addCase(createAssignClass.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAssignClass.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createAssignClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Bulk AssignClass
    builder
      .addCase(bulkAssignClass.pending, (state) => {
        state.loading = true;
      })
      .addCase(bulkAssignClass.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(bulkAssignClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = AssignClassSlice.actions;

export default AssignClassSlice.reducer;
