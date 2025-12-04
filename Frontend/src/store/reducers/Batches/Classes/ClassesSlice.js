import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get All classes for a specific batch
export const fetchClasses = createAsyncThunk(
  "classes/fetchClasses",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/dashboard/batches/${id}/classes`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Get All Trainer for Classes
export const fetchTrainerForClasses = createAsyncThunk(
  "classes/fetchTrainerForClasses",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/dashboard/batches/classes/trainers`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// fetch single class
export const fetchClass = createAsyncThunk(
  "classes/fetchClass",
  async (Class, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/dashboard/batches/${
          Class.batch_id
        }/classes/${Class.class_id}`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// create a new class
export const createClass = createAsyncThunk(
  "classes/createClass",
  async (Class, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/dashboard/batches/${
          Class.id
        }/classes/create`,
        Class.class_data
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Update a class
export const updateClass = createAsyncThunk(
  "classes/updateClass",
  async (Class, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/batches/${
          Class.batch_id
        }/classes/${Class.class_data.id}/update`,
        Class.class_data.classes
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Delete a class
export const deleteClass = createAsyncThunk(
  "classes/deleteClass",
  async (Class, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/dashboard/batches/${
          Class.batch_id
        }/classes/${Class.class_id}/delete`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// update Confirmation Trainee
export const ConfirmationTrainee = createAsyncThunk(
  "classes/ConfirmationTrainee",
  async ({ class_id, trainee_id, confirmation }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${
          import.meta.env.VITE_API_URL
        }/dashboard/batches/${class_id}/classes/${trainee_id}/confirm`,
        { confirmation }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const filterClasses = createAsyncThunk(
  "classes/filterClasses",
  async ({ batch_id, filter }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${
          import.meta.env.VITE_API_URL
        }/dashboard/batches/${batch_id}/filter-classes`,
        filter
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// update payment in class
export const UpdatePayment = createAsyncThunk(
  "classes/UpdatePayment",
  async ({ payment, class_id, trainee_id }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${
          import.meta.env.VITE_API_URL
        }/dashboard/batches/classes/${trainee_id}/payment-update`,
        { payment, class_id }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const ClassesSlice = createSlice({
  name: "classes",
  initialState: {
    classes: [],
    trainer_classes: [],
    single_class: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(filterClasses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(filterClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.classes = action.payload;
      })
      .addCase(filterClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get All Trainer for Classes
    builder
      .addCase(fetchTrainerForClasses.fulfilled, (state, action) => {
        state.trainer_classes = action.payload;
      })
      .addCase(fetchTrainerForClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // fetch single class
    builder
      .addCase(fetchClass.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClass.fulfilled, (state, action) => {
        state.loading = false;
        state.single_class = action.payload;
      })
      .addCase(fetchClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // create a new class
    builder
      .addCase(createClass.pending, (state) => {
        state.loading = true;
      })
      .addCase(createClass.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update a class
    builder
      .addCase(updateClass.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateClass.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // update a payment
    builder.addCase(UpdatePayment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Delete a class
    builder.addCase(deleteClass.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearError } = ClassesSlice.actions;

export default ClassesSlice.reducer;
