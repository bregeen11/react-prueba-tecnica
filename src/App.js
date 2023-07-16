import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import './App.css';
import Formulario from './components/Formulario';
import TablaDataGrid from './components/TablaDataGrid';  // Importa el componente TablaDataGrid en lugar de TablaListado
import Notificaciones from './components/Notificaciones';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <h1>¡Bienvenido a mi aplicación!</h1>
        <Formulario />
        <TablaDataGrid />  {/* Utiliza el componente TablaDataGrid en lugar de TablaListado */}
        <Notificaciones />
      </div>
    </Provider>
  );
};

export default App;



