import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get All Roles
export const fetchRoles = createAsyncThunk(
  "role/fetchRoles",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/dashboard/roles`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get a role by id
export const fetchRoleById = createAsyncThunk(
  "role/fetchRoleById",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/dashboard/roles/${id}/permissions`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create a new role
export const createRole = createAsyncThunk(
  "role/createRole",
  async (role, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/dashboard/roles/create`,
        role
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// update role
export const updateRole = createAsyncThunk(
  "role/updateRole",
  async (role, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/roles/${role.id}/update`,
        role.role
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// delete role
export const deleteRole = createAsyncThunk(
  "role/deleteRole",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/dashboard/roles/${id}/delete`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// bulk delete roles
export const bulkDeleteRoles = createAsyncThunk(
  "role/bulkDeleteRoles",
  async (Usersids, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    console.log(Usersids);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/dashboard/roles/delete`,
        Usersids
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const RoleSlice = createSlice({
  name: "role",
  initialState: {
    roles: [],
    role: {},
    error: null,
    isLoading: false,
    isSuccess: null,
    create: {
      isLoading: false,
    },
    isUpdate: {
      isLoading: false,
    },
    isDelete: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },

    clearSuccess: (state) => {
      state.create.isSuccess = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // get a role by id
    builder
      .addCase(fetchRoleById.fulfilled, (state, action) => {
        state.role = action.payload;
      })
      .addCase(fetchRoleById.rejected, (state, action) => {
        state.error = action.payload;
      });

    // create a new role
    builder
      .addCase(createRole.pending, (state) => {
        state.create.isLoading = true;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.create.isLoading = false;
        state.isSuccess = action.payload;
      })
      .addCase(createRole.rejected, (state, action) => {
        state.create.isLoading = false;
        state.error = action.payload;
      });

    // update role
    builder
      .addCase(updateRole.pending, (state) => {
        state.isUpdate.isLoading = true;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.isUpdate.isLoading = false;
        state.isSuccess = action.payload;
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.isUpdate.isLoading = false;
        state.error = action.payload;
      });

    // delete role
    builder
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.isSuccess = action.payload;
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.error = action.payload;
      });

    // bulk delete roles
    builder
      .addCase(bulkDeleteRoles.fulfilled, (state, action) => {
        state.isSuccess = action.payload;
      })
      .addCase(bulkDeleteRoles.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess } = RoleSlice.actions;

export default RoleSlice.reducer;
