import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserSelf = createAsyncThunk(
  "profile/getUserSelf",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/dashboard/user`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// update user profile
export const updateUserProfile = createAsyncThunk(
  "profile/updateUserProfile",
  async (user, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/dashboard/user/update`,
        user,
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

const ProfileSlice = createSlice({
  name: "profile",
  initialState: {
    loading: false,
    profile: {},
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserSelf.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(getUserSelf.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // update a user profile
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = ProfileSlice.actions;

export default ProfileSlice.reducer;
