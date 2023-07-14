// src/store/reducers/dataSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  currentPage: 1,
  pageSize: 10,
  totalItems: 0
};

console.log("hola mundo");
const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData(state, action) {
        console.log('Setting data:', action.payload);
        state.data = action.payload;
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
    }
  }
});

export const { setData, clearData, setCurrentPage, setPageSize, setTotalItems } = dataSlice.actions;
export const reducer = dataSlice.reducer;


