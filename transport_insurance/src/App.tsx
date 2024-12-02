// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import store from './store';

// import DriversListPage from './pages/DriversListPage/DriversListPage';
// import DriverDetailPage from './pages/DriverDetailPage/DriverDetailPage';
// import HomeInsurancePage from './pages/HomeInsurancePage';

// const isGitHubPages = window.location.hostname === 'Radchenko27.github.io';
// const basename = isGitHubPages ? '/DevelopmentNetworkApplicationFrontend' : '';

// const router = createBrowserRouter([
//   {path: "/", element: <HomeInsurancePage />,},
//   {path: "/drivers",element: <DriversListPage />,},
//   {path: "/drivers/:id",element: <DriverDetailPage />,},
//   ],
//   { basename }
// );

// function App() {
//   return (
//     <Provider store={store}>
//       <RouterProvider router={router} />
//     </Provider>
//   );
// }

// export default App

import { useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { invoke } from "@tauri-apps/api/core";
import DriversListPage from "./pages/DriversListPage/DriversListPage";
import DriverDetailPage from "./pages/DriverDetailPage/DriverDetailPage";
import HomeInsurancePage from "./pages/HomeInsurancePage";

function App() {
  useEffect(() => {
    invoke("tauri", { cmd: "create" })
      .then(() => {
        console.log("Tauri launched");
      })
      .catch(() => {
        console.log("Tauri not launched");
      });
    return () => {
      invoke("tauri", { cmd: "close" })
        .then(() => {
          console.log("Tauri launched");
        })
        .catch(() => {
          console.log("Tauri not launched");
        });
    };
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<HomeInsurancePage />} />
          <Route path="/drivers" element={<DriversListPage />} />
          <Route path="/drivers/:id" element={<DriverDetailPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;