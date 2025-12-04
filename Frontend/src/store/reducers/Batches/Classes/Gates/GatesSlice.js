import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get All gate classes
export const fetchGateClasses = createAsyncThunk(
  "gatesClasses/fetchGateClasses",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/dashboard/batches/classes/gates`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// create a new gate class
export const createGateClass = createAsyncThunk(
  "gatesClasses/createGateClass",
  async (gateClass, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/dashboard/batches/classes/gate/add`,
        gateClass
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const GatesSlice = createSlice({
  name: "gatesClasses",
  initialState: {
    loading: false,
    gate_classes: [],
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGateClasses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGateClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.gate_classes = action.payload;
      })
      .addCase(fetchGateClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // create a new gate class
    builder
      .addCase(createGateClass.pending, (state) => {
        state.loading = true;
      })
      .addCase(createGateClass.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createGateClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = GatesSlice.actions;

export default GatesSlice.reducer;
