import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root';

import { getResultados, Resultados } from './routes/Resultados';
import { getTestes, Testes } from './routes/Testes';
import Home from './routes/Home';

const router = createBrowserRouter([{
  path: '/',
  element: <Root />,
  children: [{
    path: 'resultados',
    element: <Resultados />,
    loader: getResultados
  }, {
    path: 'testes',
    element: <Testes />,
    loader: getTestes
  }, {
    path: 'home',
    element: <Home />
  }]
}]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);