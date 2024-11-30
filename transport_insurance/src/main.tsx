import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import "./index.css";
// import App from "./App.tsx";
import HomeInsurancePage from "./pages/HomeInsurancePage.tsx";
import DriversListPage from "./pages/DriversListPage/DriversListPage.tsx";
import DriverDetailPage from "./pages/DriverDetailPage/DriverDetailPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeInsurancePage />,
  },
  {
    path: "/drivers",
    element: <DriversListPage />,
  },
  {
    path: "/drivers/:id",
    element: <DriverDetailPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <RouterProvider router={router} />
  // </StrictMode>
);
