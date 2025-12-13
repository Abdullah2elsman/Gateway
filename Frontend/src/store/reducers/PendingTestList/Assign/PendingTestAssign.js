import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Get All Levels Assign
export const fetchPendingTestAssignLevel = createAsyncThunk(
  "pendingTestAssign/fetchPendingTestAssignLevel",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/dashboard/pendinglist/levels`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// create a new assign level for padding Test
export const createPendingTestAssignLevel = createAsyncThunk(
  "pendingTestAssign/createPendingTestAssignLevel",
  async (pendingTestAssignLevel, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/dashboard/pendinglist/level/add`,
        pendingTestAssignLevel
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Get All Trainer Assign
export const fetchPendingTestAssignTrainer = createAsyncThunk(
  "pendingTestAssign/fetchPendingTestAssignTrainer",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/dashboard/pendinglist/view-trainers`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// update Assign Level for paddingTest
export const updatePendingTestAssignLevel = createAsyncThunk(
  "pendingTestAssign/updatePendingTestAssignLevel",
  async (trainee, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/pendinglist/${
          trainee.id
        }/assign-level`,
        { level: trainee.level }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// remove Assign Level for paddingTest
export const removePendingTestAssignLevel = createAsyncThunk(
  "pendingTestAssign/removePendingTestAssignLevel",
  async (trainee_id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/pendinglist/${trainee_id}/assign-level`,
        { level: null }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);



// update Assign Trainer for paddingTest
export const updatePendingTestAssignTrainer = createAsyncThunk(
  "pendingTestAssign/updatePendingTestAssignTrainer",
  async (trainee, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/pendinglist/${
          trainee.id
        }/assign-trainer`,
        { trainer: trainee.trainer }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const ResetupdatePendingTestAssignTrainer = createAsyncThunk(
  "pendingTestAssign/ResetupdatePendingTestAssignTrainer",
  async (trainee, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/pendinglist/${
          trainee.id
        }/assign-trainer`,
        { trainer: trainee.trainer }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// bulk assgin level
export const bulkAssignLevel = createAsyncThunk(
  "pendingTestAssign/bulkAssignLevel",
  async (bulkTrainees, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/pendinglist/assign-level`,
        bulkTrainees
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// bulk assgin trainer
export const bulkAssignTrainer = createAsyncThunk(
  "pendingTestAssign/bulkAssignTrainer",
  async (bulkTrainees, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/pendinglist/assign-trainer`,
        bulkTrainees
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// bulk assgin trainer
export const bulkResetAssignTrainer = createAsyncThunk(
  "pendingTestAssign/bulkResetAssignTrainer",
  async (bulkTrainees, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/pendinglist/assign-trainer`,
        bulkTrainees
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const PendingTestAssignSlice = createSlice({
  name: "pendingTestAssign",
  initialState: {
    pendingTestAssignLevel: [],
    pendingTestAssignTrainer: [],
    isLoading: false,
    Loading_reset: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPendingTestAssignLevel.fulfilled, (state, action) => {
        state.pendingTestAssignLevel = action.payload;
      })
      .addCase(fetchPendingTestAssignLevel.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // create a new assign level
      .addCase(createPendingTestAssignLevel.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    //  get all pending assign trainer
    builder
      .addCase(fetchPendingTestAssignTrainer.fulfilled, (state, action) => {
        state.pendingTestAssignTrainer = action.payload;
      })
      .addCase(fetchPendingTestAssignTrainer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // update assign level
    builder
      .addCase(updatePendingTestAssignLevel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePendingTestAssignLevel.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updatePendingTestAssignLevel.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // remove assign level
    builder
      .addCase(removePendingTestAssignLevel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removePendingTestAssignLevel.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(removePendingTestAssignLevel.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // update assign trainer
    builder
      .addCase(updatePendingTestAssignTrainer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePendingTestAssignTrainer.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updatePendingTestAssignTrainer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Reset update assign trainer
    builder
      .addCase(ResetupdatePendingTestAssignTrainer.pending, (state) => {
        state.Loading_reset = true;
      })
      .addCase(ResetupdatePendingTestAssignTrainer.fulfilled, (state) => {
        state.Loading_reset = false;
      })
      .addCase(
        ResetupdatePendingTestAssignTrainer.rejected,
        (state, action) => {
          state.Loading_reset = false;
          state.error = action.payload;
        }
      );

    // bulk assgin level
    builder
      .addCase(bulkAssignLevel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(bulkAssignLevel.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(bulkAssignLevel.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // bulk assgin trainer
    builder
      .addCase(bulkAssignTrainer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(bulkAssignTrainer.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(bulkAssignTrainer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // bulk reset assgin trainer
    builder
      .addCase(bulkResetAssignTrainer.pending, (state) => {
        state.Loading_reset = true;
      })
      .addCase(bulkResetAssignTrainer.fulfilled, (state) => {
        state.Loading_reset = false;
      })
      .addCase(bulkResetAssignTrainer.rejected, (state, action) => {
        state.Loading_reset = false;
        state.error = action.payload;
      });


  },
});

export const { clearError } = PendingTestAssignSlice.actions;

export default PendingTestAssignSlice.reducer;
