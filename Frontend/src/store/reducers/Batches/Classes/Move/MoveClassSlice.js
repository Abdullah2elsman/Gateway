import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// update Move class to wait
export const updateMoveClassToWait = createAsyncThunk(
  "moveClass/updateMoveClassToWait",
  async ({ class_id, trainee_id }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${
          import.meta.env.VITE_API_URL
        }/dashboard/batches/${class_id}/classes/${trainee_id}/move-to-wait`
      );
      return res.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

// update Move class to hold
export const updateMoveClassToHold = createAsyncThunk(
  "moveClass/updateMoveClassToHold",
  async ({ class_id, trainee_id }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${
          import.meta.env.VITE_API_URL
        }/dashboard/batches/${class_id}/classes/${trainee_id}/move-to-hold`
      );
      return res.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

// update Move class to refund
export const updateMoveClassToRefund = createAsyncThunk(
  "moveClass/updateMoveClassToRefund",
  async ({ class_id, trainee_id }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${
          import.meta.env.VITE_API_URL
        }/dashboard/batches/${class_id}/classes/${trainee_id}/move-to-refund`
      );
      return res.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

// update Move class to blackList
export const updateMoveClassToBlackList = createAsyncThunk(
  "moveClass/updateMoveClassToBlackList",
  async ({ class_id, trainee_id }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${
          import.meta.env.VITE_API_URL
        }/dashboard/batches/${class_id}/classes/${trainee_id}/move-to-black`
      );
      return res.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

// Add to Attendance
export const AddToAttendance = createAsyncThunk(
  "moveClass/AddToAttendance",
  async ({ class_id, trainee_id }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `${
          import.meta.env.VITE_API_URL
        }/dashboard/batches/${class_id}/classes/${trainee_id}/add-to-attendance`
      );
      return res.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

// Get All Switch Classes
export const GetAllSwitchClasses = createAsyncThunk(
  "moveClass/GetAllSwitchClasses",
  async (class_id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/dashboard/batches/${class_id}/view-select-classes`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// update Switch Classes
export const updateSwitchClasses = createAsyncThunk(
  "moveClass/updateSwitchClasses",
  async ({ class_id, old_class, trainee_id }, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const res = await axios.put(
        `${
          import.meta.env.VITE_API_URL
        }/dashboard/batches/classes/${trainee_id}/switch-class`,
        { class_id, old_class }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get All Admin Notes
export const GetAllAdminNotes = createAsyncThunk(
  "moveClass/GetAllAdminNotes",
  async ({ class_id, trainee_id }, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/dashboard/batches/${class_id}/classes/${trainee_id}/view-admin-note`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//  Add a new Admin Notes
export const AddNewAdminNotes = createAsyncThunk(
  "moveClass/AddAdminNotes",
  async ({ class_id, trainee_id, admin_note }, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const res = await axios.put(
        `${
          import.meta.env.VITE_API_URL
        }/dashboard/batches/${class_id}/classes/${trainee_id}/add-admin-note`,
        { admin_note }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const MoveClassSlice = createSlice({
  name: "moveClass",
  initialState: {
    isLoading: false,
    error: null,
    viewSwitchClass: [],
    viewAdminNotes: [],
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateMoveClassToWait.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(updateMoveClassToHold.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(updateMoveClassToRefund.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(updateMoveClassToBlackList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(AddToAttendance.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    //  Get All Switch Classes
    builder
      .addCase(GetAllSwitchClasses.fulfilled, (state, action) => {
        state.viewSwitchClass = action.payload;
      })
      .addCase(GetAllSwitchClasses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // update Switch Classes
    builder
      .addCase(updateSwitchClasses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSwitchClasses.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateSwitchClasses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Get All Admin Notes
    builder
      .addCase(GetAllAdminNotes.fulfilled, (state, action) => {
        state.viewAdminNotes = action.payload;
      })
      .addCase(GetAllAdminNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Add a new Admin Notes
    builder
      .addCase(AddNewAdminNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AddNewAdminNotes.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(AddNewAdminNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = MoveClassSlice.actions;

export default MoveClassSlice.reducer;
