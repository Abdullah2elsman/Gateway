import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get All Pending User
export const fetchPendingUsers = createAsyncThunk(
  "pendingUser/fetchPendingUser",
  async (branch, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/pending-users`,
        { branch }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Activate Pending User
export const activatePendingUser = createAsyncThunk(
  "pendingUser/activate",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/pending-users/${id}/activate`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// bulk Activate Users
export const bulkActivateUsers = createAsyncThunk(
  "pendingUser/bulkActivate",
  async (Userids, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/pending-users/activate`,
        Userids
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete Pending User
export const deletePendingUser = createAsyncThunk(
  "pendingUser/delete",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/dashboard/pending-users/${id}/delete`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Bulk delete pending users
export const bulkDeletePendingUsers = createAsyncThunk(
  "pendingUser/bulkDelete",
  async (Userids, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/dashboard/pending-users/delete`,
        Userids
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const PendingUserSlice = createSlice({
  name: "pendingUser",
  initialState: {
    pendingUser: [],
    error: null,
    isLoading: false,
    deleted: null,
    isActivate: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPendingUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPendingUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pendingUser = action.payload;
      })
      .addCase(fetchPendingUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Activate pending users
    builder
      .addCase(activatePendingUser.fulfilled, (state, action) => {
        state.isActivate = action.payload;
      })
      .addCase(activatePendingUser.rejected, (state, action) => {
        state.error = action.payload;
      });

    // Delete pending users
    builder
      .addCase(deletePendingUser.fulfilled, (state, action) => {
        state.deleted = action.payload;
      })
      .addCase(deletePendingUser.rejected, (state, action) => {
        state.error = action.payload;
      });

    // Bulk activate pending users
    builder
      .addCase(bulkActivateUsers.fulfilled, (state, action) => {
        state.isActivate = action.payload;
      })
      .addCase(bulkActivateUsers.rejected, (state, action) => {
        state.error = action.payload;
      });

    // Bulk delete pending users
    builder
      .addCase(bulkDeletePendingUsers.fulfilled, (state, action) => {
        state.deleted = action.payload;
      })
      .addCase(bulkDeletePendingUsers.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearError } = PendingUserSlice.actions;

export default PendingUserSlice.reducer;
