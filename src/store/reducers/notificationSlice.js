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
    clientDeleted(state, action) {
      return 'Cliente eliminado correctamente'; // Mensaje predeterminado para notificación de cliente eliminado
    },
  }
});

export const {
  showNotification,
  hideNotification,
  clearNotification,
  clientDeleted, // Agregamos la nueva acción para notificar cuando un cliente es eliminado
} = notificationSlice.actions;
export const reducer = notificationSlice.reducer;


