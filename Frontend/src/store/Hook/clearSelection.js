import { createSlice } from "@reduxjs/toolkit";

const clearSelection = createSlice({
  name: "Selection",
  initialState: {
    selectedRowIds: {},
  },
  reducers: {
    storedRowIds: (state, action) => {
      state.selectedRowIds = action.payload;
    },
    clearSelected: (state) => {
      state.selectedRowIds = {};
    },
  },
});

export const { storedRowIds, clearSelected } = clearSelection.actions;
export default clearSelection.reducer;
