import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import alertReducer from "./slices/alertSlice";
import eventReducer from "./slices/eventSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    alert: alertReducer,
    event: eventReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
