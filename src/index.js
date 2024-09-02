import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Inicio from './paginas/Inicio';
import NaoEncontrada from './paginas/NaoEncontrada';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Inicio nome="Joaquim"/>
      },
      {
        path: "/*",
        element: <NaoEncontrada/>
      }
    ]
  },
]);  


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} className="App"/>
  </React.StrictMode>
);