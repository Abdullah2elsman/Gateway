import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { AES } from "crypto-js";

// Create Login
export const createLogin = createAsyncThunk(
  "login/create",
  async (user, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth`,
        user
      );

      console.log(res.data);
      if (res.data) {
        let in6Hours = new Date(new Date().getTime() + 360 * 60 * 1000);

        Cookies.set(
          "GateWay_user",
          AES.encrypt(
            JSON.stringify({
              token: res.data.token,
              user: {
                id: res.data.user.id,
                full_name: res.data.user.full_name,
                email: res.data.user.email,
              },
            }),
            import.meta.env.VITE_WEBSITE_COOKIES_KEY
          ),
          {
            // secure: true,
            expires: user.remember
              ? Number(import.meta.env.VITE_WEBSITE_COOKIES_EXPIRES)
              : in6Hours,
          }
        );

        Cookies.set(
          "GateWay_VR",
          AES.encrypt(
            JSON.stringify({
              general: res.data.user.permissions.general,
              branches: res.data.user.permissions.branches,
              roles: res.data.user.permissions.roles,
              users: res.data.user.permissions.users,
              pendingusers: res.data.user.permissions.pendingusers,
              trainees: res.data.user.permissions.trainees,
              pendinglist: res.data.user.permissions.pendinglist,
              announcements: res.data.user.permissions.announcements,
              attendance: res.data.user.permissions.attendance,
            }),
            import.meta.env.VITE_WEBSITE_COOKIES_KEY
          ),
          {
            // secure: true,
            expires: user.remember
              ? Number(import.meta.env.VITE_WEBSITE_COOKIES_EXPIRES)
              : in6Hours,
          }
        );

        Cookies.set(
          "GateWay_VR2",
          AES.encrypt(
            JSON.stringify({
              waitlist: res.data.user.permissions.waitlist,
              holdlist: res.data.user.permissions.holdlist,
              refundlist: res.data.user.permissions.refundlist,
              blacklist: res.data.user.permissions.blacklist,
            }),
            import.meta.env.VITE_WEBSITE_COOKIES_KEY
          ),
          {
            // secure: true,
            expires: user.remember
              ? Number(import.meta.env.VITE_WEBSITE_COOKIES_EXPIRES)
              : in6Hours,
          }
        );

        Cookies.set(
          "GateWay_VR3",
          AES.encrypt(
            JSON.stringify({
              batches: res.data.user.permissions.batches,
              classes: res.data.user.permissions.classes,
              settings: res.data.user.permissions.settings,
              notification: res.data.user.permissions.notification,
            }),
            import.meta.env.VITE_WEBSITE_COOKIES_KEY
          ),
          {
            // secure: true,
            expires: user.remember
              ? Number(import.meta.env.VITE_WEBSITE_COOKIES_EXPIRES)
              : in6Hours,
          }
        );

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.token}`;
      }

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create Logout
export const createLogOut = createAsyncThunk(
  "login/createLogout",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/logout`);

      if (res.data) {
        Cookies.remove("GateWay_user", { expires: 0 });
        Cookies.remove("GateWay_VR", { expires: 0 });
        Cookies.remove("GateWay_VR2", { expires: 0 });
        Cookies.remove("GateWay_VR3", { expires: 0 });
        axios.defaults.headers.common["Authorization"] = "";
      }

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Forget Password
export const forgetPassword = createAsyncThunk(
  "login/forgetPassword",
  async (email, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/forget-password`,
        { email }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Reset Password
export const resetPassword = createAsyncThunk(
  "login/resetPassword",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/reset-password`,
        data
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const LoginSlice = createSlice({
  name: "login",
  initialState: {
    isLoading: false,
    isError: null,
    user: null,
  },
  reducers: {
    clearError: (state) => {
      state.isError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(createLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });

    // forget Password
    builder
      .addCase(forgetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgetPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });

    // Reset Password
    builder
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export const { clearError } = LoginSlice.actions;

export default LoginSlice.reducer;
