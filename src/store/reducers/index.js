import { combineReducers } from '@reduxjs/toolkit';
import { reducer as notificationReducer } from './notificationSlice';
import { reducer as filterReducer } from './filterSlice';
import { reducer as dataReducer } from './dataSlice';

const rootReducer = combineReducers({
  notification: notificationReducer,
  filter: filterReducer,
  data: dataReducer
});

export default rootReducer;

