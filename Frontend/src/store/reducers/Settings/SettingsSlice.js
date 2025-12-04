import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// fetch settings
export const fetchSettings = createAsyncThunk(
  "settings/fetchSettings",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/site-info`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// update settings
export const updateSettings = createAsyncThunk(
  "settings/updateSettings",
  async (settings, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/dashboard/settings/update`,
        settings,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const SettingsSlice = createSlice({
  name: "settings",
  initialState: {
    settings: {},
    loading: false,
    loadingSave: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.error = action.payload;
      });

    // update settings
    builder
      .addCase(updateSettings.pending, (state) => {
        state.loadingSave = true;
      })
      .addCase(updateSettings.fulfilled, (state) => {
        state.loadingSave = false;
      })
      .addCase(updateSettings.rejected, (state, action) => {
        state.loadingSave = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = SettingsSlice.actions;

export default SettingsSlice.reducer;
