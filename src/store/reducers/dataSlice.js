import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  currentPage: 1,
  pageSize: 10,
  totalItems: 0,
  filters: {
    keyword: '',
    category: '',
  },
  selectedCliente: null, // Agregamos el estado para el cliente seleccionado
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
    updateFilters(state, action) {
      state.filters = action.payload;
      state.currentPage = 1;
    },
    addCliente(state, action) {
      const newCliente = { ...action.payload, id: state.data.length + 1 };
      state.data.push(newCliente);
    },
    updateCliente(state, action) {
      const updatedCliente = action.payload;
      const index = state.data.findIndex((cliente) => cliente.id === updatedCliente.id);
      if (index !== -1) {
        state.data[index] = updatedCliente;
      }
    },
    deleteCliente(state, action) {
      const clienteId = action.payload;
      state.data = state.data.filter((cliente) => cliente.id !== clienteId);
    },
    // Nueva acción para establecer el cliente seleccionado
    setSelectedCliente(state, action) {
      state.selectedCliente = action.payload;
    },
  },
});

export const {
  setData,
  clearData,
  setCurrentPage,
  setPageSize,
  setTotalItems,
  updateFilters,
  addCliente,
  updateCliente,
  deleteCliente,
  setSelectedCliente, // No olvides incluir la nueva acción en la exportación
} = dataSlice.actions;

export const reducer = dataSlice.reducer;
