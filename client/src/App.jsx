import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./charts/ChartjsConfig";
// Import pages
import Dashboard from "./pages/Dashboard";
import Login from "./Login/Login";
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
import DashboardTrainer from "./TrainerDashboard/pages/DashboardTrainer"
import LoginTrainer from "./TrainerDashboard/trainer/LoginTrainer"
import Addintern from "./TrainerDashboard/pages/intern/Addintern"
import "./style.css"
import Firstview from "./pages/Firstview";
import Viewintern from "./TrainerDashboard/pages/intern/Viewintern";
import Updateintern from "./TrainerDashboard/pages/intern/Updateintern";
import Add from "./TrainerDashboard/pages/Assignment/Add";
import View from "./TrainerDashboard/pages/Assignment/View";
import InternSubmitted from "./TrainerDashboard/pages/Assignment/InternSubmitted";
import UpdateAssign from "./TrainerDashboard/pages/Assignment/UpdateAssign";
import AddAttendace from "./TrainerDashboard/pages/Attendance/Add"
import ViewAttend from "./TrainerDashboard/pages/Attendance/ViewAttend";
import Addbatch from "./TrainerDashboard/pages/Batch/Addbatch";
import Viewbatch from "./TrainerDashboard/pages/Batch/Viewbatch";
import Updatebatch from "./TrainerDashboard/pages/Batch/Updatebatch";
import Profile from "./Login/Profile";

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

        {/* ADMIN */}
        <Route exact path="/admin" element={<Dashboard />}>
          <Route exact path="/admin/addtrainee"element={<Addtrainee />} />
          <Route exact path="/admin/viewtrainee"element={<Viewtraine />} />
          <Route exact path="/admin/update/:id"element={<Updatetraine />} />
          <Route exact path="/admin/addIntern"element={<AddIntern />} />
          <Route exact path="/admin/viewIntern"element={<ViewIntern />} />
          <Route exact path="/admin/updateintern/:id"element={<UpdateIntern />} />
          <Route exact path="/admin/batches"element={<AddBatch />} />
          <Route exact path="/admin/viewbatches"element={<ViewBatch />} />
          <Route exact path="/admin/updatebatch/:id"element={<UpdateBatch />}/>
        <Route exact path="/admin/profile/:id" element= {<Profile/>}/> 
        </Route>
        <Route exact path="/adminlogin" element={<Login/>} />
        <Route exact path="/user/register" element= {<Register/>}/> 


        
        {/* TRAINER */}
        <Route exact path="/trainer" element={<DashboardTrainer />}>
          <Route exact path="/trainer/addbatch" element= {<Addbatch/>}/> 
          <Route exact path="/trainer/viewbatch" element= {<Viewbatch/>}/> 
          <Route exact path="/trainer/updatebatch/:id" element= {<Updatebatch/>}/> 

      
          <Route exact path="/trainer/addintern" element= {<Addintern/>}/> 
          <Route exact path="/trainer/viewintern" element= {<Viewintern/>}/> 
          <Route exact path="/trainer/updateintern/:id" element= {<Updateintern/>}/> 

          <Route exact path="/trainer/addassignment" element= {<Add/>}/> 
          <Route exact path="/trainer/viewassignment" element= {<View/>}/> 
          <Route exact path="/trainer/updateassignment/:id" element= {<UpdateAssign/>}/> 
          <Route exact path="/trainer/internsubmitted" element= {<InternSubmitted/>}/> 

          <Route exact path="/trainer/addattendance" element= {<AddAttendace/>}/> 
          <Route exact path="/trainer/viewattendance" element= {<ViewAttend/>}/> 

        </Route>


        {/* login page */}
        <Route exact path="/trainerlogin" element={<LoginTrainer/>}/>


        {/* landing page */}
        <Route exact path="/" element= {<Firstview/>}/>
      </Routes>
    </>
  );
}

export default App;
