import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [], // Tu estado inicial de data
  currentPage: 1,
  pageSize: 10,
  totalItems: 0,
  filters: {
    keyword: '',
    category: '',
  },
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
      const newCliente = { ...action.payload, id: state.data.length + 1 }; // Agregar una propiedad 'id' única
      state.data.push(newCliente);
    },
    updateCliente(state, action) {
      // Resto del código
    },
    deleteCliente(state, action) {
      // Resto del código
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
} = dataSlice.actions;
export const reducer = dataSlice.reducer;

