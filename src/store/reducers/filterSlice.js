import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  keyword: '',
  category: ''
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setKeyword(state, action) {
      state.keyword = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    clearFilters(state, action) {
      state.keyword = '';
      state.category = '';
    }
  }
});

export const { setKeyword, setCategory, clearFilters } = filterSlice.actions;
export const reducer = filterSlice.reducer;


