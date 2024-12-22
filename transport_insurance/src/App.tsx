import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import DriversListPage from "./pages/DriversListPage/DriversListPage";
import DriverDetailPage from "./pages/DriverDetailPage/DriverDetailPage";
import HomeInsurancePage from "./pages/HomeInsurancePage";
import InsurancesList from "./pages/InsurancesList/InsurancesList";
import InsuranceDetails from "./pages/InsuranceDetails/InsuranceDetails";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";

const router = createBrowserRouter([
  { path: "/", element: <HomeInsurancePage /> },
  { path: "/drivers", element: <DriversListPage /> },
  { path: "/drivers/:id", element: <DriverDetailPage /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/profile", element: <Profile /> },
  // { path: '/insurances/:pk', element: <OrderDetailDatacenter /> },
  { path: "/insurances", element: <InsurancesList /> },
  { path: "/insurances/:id", element: <InsuranceDetails /> },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
