import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { AppProvider } from "./AppContext";

import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import Skins from "./paginas/Skins";
import DetalhesSkin from "./paginas/DetalhesSkin";
import NaoEncontrada from "./paginas/NaoEncontrada";
import Sobre from "./paginas/Sobre";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Navigate to="/skins" />,
      },
      {
        path: "/skins",
        element: <Skins />,
      },
      {
        path: "/skins/:id",
        element: <DetalhesSkin />,
      },
      {
        path: "/sobre",
        element: <Sobre />
      },
      {
        path: "/*",
        element: <NaoEncontrada />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </AppProvider>
);