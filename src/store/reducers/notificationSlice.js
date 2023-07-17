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
    },
  },
});

export const { showNotification, hideNotification, clearNotification } =
  notificationSlice.actions;

// Nuevas acciones para notificar cuando un cliente es eliminado o actualizado
export const clientDeleted = 'CLIENT_DELETED';
export const clientUpdated = 'CLIENT_UPDATED';

export const notifyClientDeleted = 'Cliente eliminado correctamente';
export const notifyClientUpdated = 'Cliente actualizado correctamente';

export const reducer = notificationSlice.reducer;

