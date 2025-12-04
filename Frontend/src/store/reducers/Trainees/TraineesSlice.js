import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ===================== GET ALL TRAINEES =====================
export const fetchTrainees = createAsyncThunk(
  "trainees/fetchTrainees",
  async ({ branch, page = 1, per_page = 50 }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      // Backend always returns 50 rows per page
      // If per_page is 100, we need to fetch 2 pages and combine them
      const pagesNeeded = Math.ceil(per_page / 50);

      if (pagesNeeded === 1) {
        // Fetch single page (50 rows)
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/dashboard/trainees`,
          { params: { branch, page } }
        );
        return res.data;
      } else {
        // Fetch multiple pages (for 100 rows, fetch 2 pages)
        // Calculate which backend pages to fetch
        const startPage = (page - 1) * pagesNeeded + 1;
        const endPage = startPage + pagesNeeded - 1;

        // Fetch all pages in parallel
        const promises = [];
        for (let p = startPage; p <= endPage; p++) {
          promises.push(
            axios.get(
              `${import.meta.env.VITE_API_URL}/dashboard/trainees`,
              { params: { branch, page: p } }
            )
          );
        }

        const responses = await Promise.all(promises);

        // Combine data from all pages
        const combinedData = [];
        responses.forEach(res => {
          combinedData.push(...res.data.data);
        });

        // Use pagination info from first response but adjust for combined pages
        const firstResponse = responses[0].data;
        return {
          data: combinedData,
          pagination: {
            total: firstResponse.pagination.total,
            per_page: per_page, // Show the requested per_page
            current_page: page, // Show the logical page number
            last_page: Math.ceil(firstResponse.pagination.total / per_page),
          }
        };
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ===================== GET SINGLE TRAINEE =====================
export const fetchSingleTrainee = createAsyncThunk(
  "trainees/fetchSingleTrainee",
  async (trainee_id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/dashboard/trainees/${trainee_id}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ===================== SEARCH TRAINEES =====================
export const fetchSearchTrainees = createAsyncThunk(
  "trainees/fetchSearchTrainees",
  async (searchQuery, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/dashboard/search`,
        { params: { query: searchQuery } } // Laravel يقرأها من $request->query
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ===================== SLICE =====================
const traineesSlice = createSlice({
  name: "trainees",
  initialState: {
    trainees: [],
    single_trainee: {},
    searchResults: [],
    pagination: {},
    isLoading: false,
    error: null,
    searchError: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.searchError = null;
    },
  },
  extraReducers: (builder) => {
    // --------------------- FETCH ALL TRAINEES ---------------------
    builder
      .addCase(fetchTrainees.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTrainees.fulfilled, (state, action) => {
        state.isLoading = false;
        state.trainees = action.payload.data || [];
        state.pagination = action.payload.pagination || {};
      })
      .addCase(fetchTrainees.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // --------------------- FETCH SINGLE TRAINEE ---------------------
    builder
      .addCase(fetchSingleTrainee.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSingleTrainee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.single_trainee = action.payload || {};
      })
      .addCase(fetchSingleTrainee.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // --------------------- SEARCH TRAINEES ---------------------
    builder
      .addCase(fetchSearchTrainees.pending, (state) => {
        state.isLoading = true;
        state.searchError = null;
      })
      .addCase(fetchSearchTrainees.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload || [];
      })
      .addCase(fetchSearchTrainees.rejected, (state, action) => {
        state.isLoading = false;
        state.searchError = action.payload;
      });
  },
});

export const { clearError } = traineesSlice.actions;
export default traineesSlice.reducer;
