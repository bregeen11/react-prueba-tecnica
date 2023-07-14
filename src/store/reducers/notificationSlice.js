// src/store/reducers/notificationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      return action.payload;
    },
    hideNotification(state, action) {
      return null;
    },
    clearNotification(state, action) {
      return null;
    }
  }
});

export const { showNotification, hideNotification, clearNotification } = notificationSlice.actions;
export const reducer = notificationSlice.reducer;


