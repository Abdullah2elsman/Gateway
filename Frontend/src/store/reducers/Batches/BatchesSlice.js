import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get All batches
export const fetchBatches = createAsyncThunk(
  "batches/fetchBatches",
  async (branch, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/batches`,
        { branch }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update Activate batch
export const updateActivateBatch = createAsyncThunk(
  "batches/updateActivateBatch",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/batches/${id}/activate`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update Activate batch
export const updateEndActivateBatch = createAsyncThunk(
  "batches/updateEndActivateBatch",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/batches/${id}/end`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//  create new a batch
export const createBatch = createAsyncThunk(
  "batches/createBatch",
  async (batch, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/dashboard/batches/create`,
        batch
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// update a batch
export const UpdateBatch = createAsyncThunk(
  "batches/updateBatch",
  async (batch, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/batches/${batch.id}/update`,
        batch
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// delete a batch
export const deleteBatch = createAsyncThunk(
  "batches/deleteBatch",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/dashboard/batches/${id}/delete`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Duplicate batch
export const DuplicateBatch = createAsyncThunk(
  "batches/DuplicateBatch",
  async (branch, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/dashboard/batches/duplicate`,
        { branch }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const BatchesSlice = createSlice({
  name: "batches",
  initialState: {
    batches: [],
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
      .addCase(fetchBatches.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBatches.fulfilled, (state, action) => {
        state.isLoading = false;
        state.batches = action.payload;
      })
      .addCase(fetchBatches.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // create a new batch
    builder
      .addCase(createBatch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBatch.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createBatch.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // update a batch
    builder
      .addCase(UpdateBatch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UpdateBatch.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(UpdateBatch.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder.addCase(updateActivateBatch.rejected, (state, action) => {
      state.error = action.payload;
    });

    builder.addCase(updateEndActivateBatch.rejected, (state, action) => {
      state.error = action.payload;
    });

    // delete a batch
    builder.addCase(deleteBatch.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const { clearError } = BatchesSlice.actions;

export default BatchesSlice.reducer;
