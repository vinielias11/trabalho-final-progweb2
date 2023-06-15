import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root';

import Resultados, { getResultados } from './routes/Resultados';
import Testes, { getTestes } from './routes/Testes';
import Login  from './routes/Login';

import { AuthProvider, RequireAuth } from './hooks/auth';

const router = createBrowserRouter([{
  path: '/',
  element:<RequireAuth><Root /></RequireAuth>,
  children: [{
    path: 'resultados',
    element: <RequireAuth><Resultados /></RequireAuth>,
    loader: getResultados
  }, {
    path: 'testes',
    element: <RequireAuth><Testes /></RequireAuth>,
    loader: getTestes
  }, {
    path: 'home',
    element: <Home />
  }]
}, {
  path: '/login',
  element: <Login />
}]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);