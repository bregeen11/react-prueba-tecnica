import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification(state, action) {
      return { ...state, message: action.payload };
    },
    hideNotification(state, action) {
      return null;
    },
    clearNotification(state, action) {
      return null;
    },
  },
});

export const { showNotification, hideNotification, clearNotification } =
  notificationSlice.actions;

export const notifyClientDeleted = "Cliente eliminado correctamente";
export const notifyClientUpdated = "Cliente actualizado correctamente";

export const reducer = notificationSlice.reducer;
