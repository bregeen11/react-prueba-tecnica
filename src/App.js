import React, { useState } from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import "./App.css";
import Formulario from "./components/Formulario";
import TablaDataGrid from "./components/TablaDataGrid";
import Notificaciones from "./components/Notificaciones";

const App = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <Provider store={store}>
      <div className="app-container">
        <h1>¡Bienvenido a mi aplicación!</h1>
        <button
          className="custom-button custom-button-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Mostrar Tabla" : "Mostrar Formulario"}
        </button>
        {showForm ? <Formulario /> : <TablaDataGrid />}
        <Notificaciones />
      </div>
    </Provider>
  );
};

export default App;
