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
import AddIntern from "./pages/AddIntern";
import ViewIntern from "./pages/ViewIntern";
import UpdateIntern from "./pages/UpdateIntern";
import Register from "./Login/Register";
import AddBatch from "./pages/adminbatch/AddBatch";
import ViewBatch from "./pages/adminbatch/ViewBatch";
import UpdateBatch from "./pages/adminbatch/UpdateBatch";

import "./style.css"

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
          <Route exact path="/admin/update/:id"element={<Updatetraine />} />
          <Route exact path="/admin/addIntern"element={<AddIntern />} />
          <Route exact path="/admin/viewIntern"element={<ViewIntern />} />
          <Route exact path="/admin/updateintern/:id"element={<UpdateIntern />} />
          <Route exact path="/admin/batches"element={<AddBatch />} />
          <Route exact path="/admin/viewbatches"element={<ViewBatch />} />
          <Route exact path="/admin/updatebatch/:id"element={<UpdateBatch />} />

        </Route>
        <Route exact path="" element={<Login/>} />
        <Route exact path="user/register" element= {<Register/>}/>       
      </Routes>
    </>
  );
}

export default App;
