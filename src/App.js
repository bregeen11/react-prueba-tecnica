import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import './App.css';
import Formulario from './components/Formulario';
import TablaListado from './components/TablaListado';
import Notificaciones from './components/Notificaciones';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <h1>¡Bienvenido a mi aplicación!</h1>
        <Formulario />
        <TablaListado />
        <Notificaciones />
      </div>
    </Provider>
  );
};

export default App;



