import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as notificationReducer } from './store/reducers/notificationSlice';
import { reducer as filterReducer } from './store/reducers/filterSlice';
import { reducer as dataReducer } from './store/reducers/dataSlice';
import './App.css';
import Formulario from './components/Formulario';
import TablaListado from './components/TablaListado'

const rootReducer = combineReducers({
  notification: notificationReducer,
  filter: filterReducer,
  data: dataReducer
});

const store = configureStore({
  reducer: rootReducer
});

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <h1>¡Bienvenido a mi aplicación!</h1>
        <Formulario />
        <TablaListado />
      </div>
    </Provider>
  );
};

export default App;

