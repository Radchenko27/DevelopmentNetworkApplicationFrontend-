import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import DriversListPage from './pages/DriversListPage/DriversListPage';
import DriverDetailPage from './pages/DriverDetailPage/DriverDetailPage';
import HomeInsurancePage from './pages/HomeInsurancePage';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register'; 

const router = createBrowserRouter([
  {path: "/", element: <HomeInsurancePage />,},
  {path: "/drivers",element: <DriversListPage />,},
  {path: "/drivers/:id",element: <DriverDetailPage />,},
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  ]
);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App
