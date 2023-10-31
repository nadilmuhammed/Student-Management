import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./charts/ChartjsConfig";
// Import pages
import Dashboard from "./pages/Dashboard";
import Login from "./Login/Login";
import DashboardCard12 from "./partials/dashboard/DashboardCard12";
import Addtrainee from "./pages/Addtrainee";
import Viewtraine from "./pages/Viewtraine";
import Updatetraine from "./pages/Updatetraine";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/admin" element={<Dashboard />}>
          <Route exact path="/admin/addtrainee"element={<Addtrainee />} />
          <Route exact path="/admin/viewtrainee"element={<Viewtraine />} />
          <Route exact path="/admin/update"element={<Updatetraine />} />
        </Route>
        <Route exact path="/admin/login" element={<Login/>} />
      </Routes>
    </>
  );
}

export default App;
