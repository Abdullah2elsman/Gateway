import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get All blackList
export const fetchBlackList = createAsyncThunk(
  "blackList/fetchBlackList",
  async (branch, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/blacklist`,
        { branch }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update blackList
export const UpdateBlackList = createAsyncThunk(
  "blackList/updateBlackList",
  async (user, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/blacklist/${user.id}/update`,
        user.data
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete a one blackList
export const DeleteBlackList = createAsyncThunk(
  "blackList/deleteBlackList",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/dashboard/blacklist/${id}/delete`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Bulk delete blackList
export const bulkDeleteBlackList = createAsyncThunk(
  "blackList/bulkDeleteBlackList",
  async (Userids, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/dashboard/blacklist/delete`,
        Userids
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const BlackListSlice = createSlice({
  name: "blackList",
  initialState: {
    blackList: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlackList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlackList.fulfilled, (state, action) => {
        state.loading = false;
        state.blackList = action.payload;
      })
      .addCase(fetchBlackList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update  blacklist
    builder
      .addCase(UpdateBlackList.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdateBlackList.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(UpdateBlackList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete  blacklist
    builder.addCase(DeleteBlackList.rejected, (state, action) => {
      state.error = action.payload;
    });

    // Bulk delete blacklist
    builder.addCase(bulkDeleteBlackList.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const { clearError } = BlackListSlice.actions;

export default BlackListSlice.reducer;
