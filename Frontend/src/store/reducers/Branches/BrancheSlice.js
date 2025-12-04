import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get All Branches  for reigster
export const getBranchesGuest = createAsyncThunk(
  "branches/getAllBranchesGuest",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/branches`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get All Branches for all pages
export const getBranchesAllPages = createAsyncThunk(
  "branches/getBranchesAllPages",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/dashboard/view-branches`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//  get All Branches  for branch page only
export const getBranches = createAsyncThunk(
  "branches/getAllBranches",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/dashboard/branches`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// create a new branch
export const createBranch = createAsyncThunk(
  "branches/createBranch",
  async (branch, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/dashboard/branches/create`,
        branch
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// update a branch
export const updateBranch = createAsyncThunk(
  "branches/updateBranch",
  async (branch, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/branches/${
          branch.id
        }/update`,
        branch.branch
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// delete a branch
export const deleteBranch = createAsyncThunk(
  "branches/deleteBranch",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/dashboard/branches/${id}/delete`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Bulk delete branches
export const bulkDeleteBranches = createAsyncThunk(
  "branches/bulkDeleteBranches",
  async (branchIds, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/dashboard/branches/delete`,
        branchIds
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const BrancheSlice = createSlice({
  name: "branches",
  initialState: {
    Guest: [],
    branches: [],
    page_branches: [],
    error: null,
    isLoading: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBranches.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBranches.fulfilled, (state, action) => {
        state.isLoading = false;
        state.branches = action.payload;
      })
      .addCase(getBranches.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // get branches for guests
    builder
      .addCase(getBranchesGuest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBranchesGuest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.Guest = action.payload;
      })
      .addCase(getBranchesGuest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // get branches for all pages
    builder
      .addCase(getBranchesAllPages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBranchesAllPages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.page_branches = action.payload;
      })
      .addCase(getBranchesAllPages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // create a new branch
    builder
      .addCase(createBranch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBranch.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createBranch.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // update a branch
    builder
      .addCase(updateBranch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBranch.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateBranch.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // delete a branch
    builder.addCase(deleteBranch.rejected, (state, action) => {
      state.error = action.payload;
    });

    // bulk delete branches
    builder.addCase(bulkDeleteBranches.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const { clearError } = BrancheSlice.actions;

export default BrancheSlice.reducer;
