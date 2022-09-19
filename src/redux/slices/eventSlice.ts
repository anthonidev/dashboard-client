import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventState } from "../../utils/types/reduxInterface";

const initialState: EventState = {
  sidebarOpen: false,
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setSidebarOpen: (state: EventState) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
  },
});

export const { setSidebarOpen } = eventSlice.actions;

export default eventSlice.reducer;
