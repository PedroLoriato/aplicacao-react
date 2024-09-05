import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Skins from "./paginas/Skins";
import DetalhesSkin from "./paginas/DetalhesSkin";
import NaoEncontrada from "./paginas/NaoEncontrada";
import SobreMim from "./paginas/SobreMim";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Skins />,
      },
      {
        path: "/skins/:id",
        element: <DetalhesSkin />,
      },
      {
        path: "/sobremim",
        element: <SobreMim />
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
  <React.StrictMode>
    <RouterProvider router={router} className="App" />
  </React.StrictMode>
);
