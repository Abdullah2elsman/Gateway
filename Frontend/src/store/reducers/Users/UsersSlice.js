import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get All Users
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (branch, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/users`,
        { branch }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// create a new User
export const createUser = createAsyncThunk(
  "users/createUser",
  async (user, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      console.log(user);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/dashboard/users/create`,
        user
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// update a User
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (user, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/users/${user.id}/update`,
        user.user
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// delete a User
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/dashboard/users/${id}/delete`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Bulk Delete
export const bulkDeleteUsers = createAsyncThunk(
  "users/bulkDeleteUsers",
  async (Userids, thunkAPI) => {
    console.log(Userids);

    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/dashboard/users/delete`,
        Userids
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const UsersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    error: null,
    isLoading: false,
    isSuccess: null,
    isUpdate: {
      user: {},
      isSuccess: null,
    },
    isDelete: null,
    bulkDelete: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // create a new user
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // update a user
    builder
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // delete a user
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isDelete = action.payload;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.error = action.payload;
    });

    // bulk delete
    builder
      .addCase(bulkDeleteUsers.fulfilled, (state, action) => {
        state.bulkDelete = action.payload;
      })
      .addCase(bulkDeleteUsers.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearError } = UsersSlice.actions;

export default UsersSlice.reducer;
