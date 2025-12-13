import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Get All Pending Test List
export const fetchPendingTestList = createAsyncThunk(
  "pendingTest/fetchPendingTestList",
  async (branch, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/pendinglist`,
        { branch }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get  Follow up
export const fetchFollowUp = createAsyncThunk(
  "pendingTest/fetchFollowUp",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/dashboard/pendinglist/view-admins`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get Payment Type
export const fetchPaymentType = createAsyncThunk(
  "pendingTest/fetchPaymentType",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/dashboard/pendinglist/payments`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// create payment type
export const createPaymentType = createAsyncThunk(
  "pendingTest/createPaymentType",
  async (payment, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/dashboard/pendinglist/payment/add`,
        payment
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// delete payment type
export const deletePaymentType = createAsyncThunk(
  "pendingTest/deletePaymentType",
  async (paymentId, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/dashboard/pendinglist/payment/${paymentId}/delete`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || error.response.data
      );
    }
  }
);

// delete level
export const deletePendingTestLevel = createAsyncThunk(
  "pendingTest/deletePendingTestLevel",
  async (levelId, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/dashboard/pendinglist/level/${levelId}/delete`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || error.response.data
      );
    }
  }
);

// create a new pending test
export const createPendingTest = createAsyncThunk(
  "pendingTest/createPendingTest",
  async (pendingTest, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/dashboard/pendinglist/create`,
        pendingTest
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// update a pending test
export const updatePendingTest = createAsyncThunk(
  "pendingTest/updatePendingTest",
  async (pendingTest, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    console.log(pendingTest);

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/pendinglist/${pendingTest.id
        }/update`,
        pendingTest.data
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// delete a pending test
export const deletePendingTest = createAsyncThunk(
  "pendingTest/deletePendingTest",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/dashboard/pendinglist/${id}/delete`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || error.response.data
      );
    }
  }
);

// Bulk delete pending test
export const bulkDeletePendingTests = createAsyncThunk(
  "pendingTest/bulkDeletePendingTests",
  async (Usersids, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/dashboard/pendinglist/delete`,
        Usersids
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || error.response.data
      );
    }
  }
);

const PendingTestSlice = createSlice({
  name: "pendingTest",
  initialState: {
    pendingTestList: [],
    error: null,
    isLoading: false,
    followUp: [],
    payments: [],
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPendingTestList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPendingTestList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pendingTestList = action.payload;
      })
      .addCase(fetchPendingTestList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // get follow up
    builder
      .addCase(fetchFollowUp.fulfilled, (state, action) => {
        state.followUp = action.payload;
      })
      .addCase(fetchFollowUp.rejected, (state, action) => {
        state.error = action.payload;
      });

    // get payment type
    builder
      .addCase(fetchPaymentType.fulfilled, (state, action) => {
        state.payments = action.payload;
      })
      .addCase(fetchPaymentType.rejected, (state, action) => {
        state.error = action.payload;
      });

    // create payment type
    builder
      .addCase(createPaymentType.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPaymentType.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createPaymentType.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // delete payment type
    builder
      .addCase(deletePaymentType.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePaymentType.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deletePaymentType.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // delete level
    builder
      .addCase(deletePendingTestLevel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePendingTestLevel.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deletePendingTestLevel.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // create a new pending test
    builder
      .addCase(createPendingTest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPendingTest.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createPendingTest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // update a pending test
    builder
      .addCase(updatePendingTest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePendingTest.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updatePendingTest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // delete a pending test
    builder.addCase(deletePendingTest.rejected, (state, action) => {
      state.error = action.payload;
    });

    // bulk delete pending test
    builder.addCase(bulkDeletePendingTests.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const { clearError } = PendingTestSlice.actions;

export default PendingTestSlice.reducer;
