import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  currentPage: 1,
  pageSize: 10,
  totalItems: 0
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData(state, action) {
      return { ...state, data: action.payload };
    },
    clearData(state, action) {
      return initialState;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setPageSize(state, action) {
      state.pageSize = action.payload;
    },
    setTotalItems(state, action) {
      state.totalItems = action.payload;
    },
    addCliente(state, action) {
      state.data.push(action.payload);
    },
    updateCliente(state, action) {
      const { id, nombre, categoria } = action.payload;
      const clienteIndex = state.data.findIndex(cliente => cliente.id === id);
      if (clienteIndex !== -1) {
        state.data[clienteIndex] = { ...state.data[clienteIndex], nombre, categoria };
      }
    },
    deleteCliente(state, action) {
      const clienteId = action.payload;
      state.data = state.data.filter(cliente => cliente.id !== clienteId);
    }
  }
});

export const {
  setData,
  clearData,
  setCurrentPage,
  setPageSize,
  setTotalItems,
  addCliente,
  updateCliente,
  deleteCliente
} = dataSlice.actions;
export const reducer = dataSlice.reducer;





