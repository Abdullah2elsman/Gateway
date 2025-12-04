import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// fetch Announcements
export const fetchAnnouncements = createAsyncThunk(
  "announcements/fetchAnnouncements",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/dashboard/announcements`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// create a new Announcement
export const createAnnouncement = createAsyncThunk(
  "announcements/createAnnouncement",
  async (announce, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/dashboard/announcements/create`,
        { announce }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// update a announcement
export const updateAnnouncement = createAsyncThunk(
  "announcements/updateAnnouncement",
  async (announce, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/announcements/update`,
        announce
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// delete a announcement
export const deleteAnnouncement = createAsyncThunk(
  "announcements/deleteAnnouncement",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/dashboard/announcements/${id}/delete`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// reply to announcement
export const fetchReplies = createAsyncThunk(
  "announcements/fetchReplies",
  async (read, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/dashboard/announcements/replies`,
        { read }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// reply to announcement
export const replyAnnouncement = createAsyncThunk(
  "announcements/replyAnnouncement",
  async (announce, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/dashboard/announcements/reply`,
        announce
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const AnnouncementsSlice = createSlice({
  name: "announcements",
  initialState: {
    announcements: [],
    replies: [],
    announce_id: "",
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setAnnounceId: (state, action) => {
      state.announce_id = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnnouncements.fulfilled, (state, action) => {
        state.announcements = action.payload;
      })
      .addCase(fetchAnnouncements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // fetch replies
    builder
      .addCase(fetchReplies.fulfilled, (state, action) => {
        state.replies = action.payload;
      })
      .addCase(fetchReplies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // create a new announcement
    builder
      .addCase(createAnnouncement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAnnouncement.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createAnnouncement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // update a announcement
    builder
      .addCase(updateAnnouncement.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAnnouncement.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateAnnouncement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // reply to announcement
    builder
      .addCase(replyAnnouncement.pending, (state) => {
        state.loading = true;
      })
      .addCase(replyAnnouncement.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(replyAnnouncement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // delete a announcement
    builder.addCase(deleteAnnouncement.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearError, setAnnounceId } = AnnouncementsSlice.actions;

export default AnnouncementsSlice.reducer;
