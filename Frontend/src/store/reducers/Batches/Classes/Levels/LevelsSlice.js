import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get All levels classes
export const fetchLevelsClasses = createAsyncThunk(
  "levelsClasses/fetchLevelsClasses",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/dashboard/batches/classes/levels`
      );
      return res.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

// create a new level in classes
export const createLevelInClasses = createAsyncThunk(
  "levelsClasses/createLevelInClasses",
  async (levelClass, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/dashboard/batches/classes/level/add`,
        levelClass
      );
      return res.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const levelClassesSlice = createSlice({
  name: "levelsClasses",
  initialState: {
    Classes_levels: [],
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
      .addCase(fetchLevelsClasses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLevelsClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.Classes_levels = action.payload;
      })
      .addCase(fetchLevelsClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Create a new level in classes
    builder
      .addCase(createLevelInClasses.pending, (state) => {
        state.loading = true;
      })
      .addCase(createLevelInClasses.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createLevelInClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = levelClassesSlice.actions;

export default levelClassesSlice.reducer;
