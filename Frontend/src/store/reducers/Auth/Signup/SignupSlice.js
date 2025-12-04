import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createSignUp = createAsyncThunk(
  "signUp/createSignUp",
  async (user, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/register`,
        user
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const SignUpSlice = createSlice({
  name: "signUp",
  initialState: {
    error: null,
    isLoading: false,
    success: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSignUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSignUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload;
      })
      .addCase(createSignUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess } = SignUpSlice.actions;

export default SignUpSlice.reducer;
