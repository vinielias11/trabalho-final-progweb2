import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Menu from './routes/Menu';
import Home from './routes/Home';

import Resultados, { getResultados } from './routes/Resultados';
import Testes, { getTestes } from './routes/Testes';
import Login  from './routes/Login';
import Realizar from './routes/Realizar';
import { AuthProvider, RequireAuth } from './hooks/auth';

const router = createBrowserRouter([{
  path: '/',
  element:<Home />,
}, {
  path: '/login',
  element: <Login />
}, {
  path: 'testes/realizar/:id',
  element: <RequireAuth><Realizar /></RequireAuth>
}, {
  path: 'menu',
  element: <RequireAuth><Menu /></RequireAuth>,
  children: [{
    path: 'resultados',
    element: <RequireAuth><Resultados /></RequireAuth>,
    loader: getResultados
  }, {
    path: 'testes',
    element: <RequireAuth><Testes /></RequireAuth>,
    loader: getTestes
  },]
}]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);