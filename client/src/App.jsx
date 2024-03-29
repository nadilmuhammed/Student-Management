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
import ViewAttend from "./TrainerDashboard/pages/Attendance/ViewAttend";
import Addbatch from "./TrainerDashboard/pages/Batch/Addbatch";
import Viewbatch from "./TrainerDashboard/pages/Batch/Viewbatch";
import Updatebatch from "./TrainerDashboard/pages/Batch/Updatebatch";
import Profile from "./Login/Profile";
import UpdateProfle from "./TrainerDashboard/trainer/UpdateProfle";
import AddAttendance from "./TrainerDashboard/pages/Attendance/AddAttendance";
import InternLogin from "./InternDashboard/Login.jsx/InternLogin";
import DashboardIntern from "./InternDashboard/pages/DashboardIntern";
import UpdateInternLogin from "./InternDashboard/Login.jsx/UpdateInternLogin"
import Assignment from "./InternDashboard/pages/Assignment/Assignment";
import AssignmentAll from "./InternDashboard/pages/Assignment/AssignmentAll";
import Addnote from "./TrainerDashboard/pages/Notes/Addnote";
import Viewnote from "./TrainerDashboard/pages/Notes/Viewnote";
import UpdatNote from "./TrainerDashboard/pages/Notes/UpdatNote";
import InternNotes from "./InternDashboard/pages/notes/InternNotes";
import Otp from "./Login/Otp";

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
        <Route exact path={`/admin/profile/${localStorage.getItem("id")}`} element= {<Profile/>}/> 
        </Route>
        <Route exact path="/adminlogin" element={<Login/>} />
        <Route exact path="/user/register" element= {<Register/>}/> 
        <Route exact path="/user/otp" element= {<Otp/>}/> 

        {/* --------------------------- */}
        
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

          <Route exact path="/trainer/addattendance" element= {<AddAttendance/>}/> 
          <Route exact path="/trainer/viewattendance" element= {<ViewAttend/>}/> 
          <Route exact path={`/trainer/profile/${localStorage.getItem("id")}` }element={<UpdateProfle/>}/>

          <Route exact path="/trainer/addnotes" element= {<Addnote/>}/> 
          <Route exact path="/trainer/viewnotes" element= {<Viewnote/>}/> 
          <Route exact path="/trainer/updatenotes/:id" element= {<UpdatNote/>}/> 
        </Route>


        {/* login page */}
        <Route exact path="/trainerlogin" element={<LoginTrainer/>}/>
       {/* ---------------- */}

          {/* intern */}
          <Route exact path="/intern" element={<DashboardIntern/>}>
           <Route exact path={`/intern/updateprofile/${localStorage.getItem("id")}`} element={<UpdateInternLogin/>}/>

           <Route exact path="/intern/Assignment" element={<Assignment />}/>
           <Route exact path="/intern/assignmentall/:id" element={<AssignmentAll />}/>

           <Route exact path="/intern/notes" element={<InternNotes />}/>


              
          </Route>
        <Route exact path="/internlogin" element={<InternLogin/>}>

        </Route>


        {/* landing page */}
        <Route exact path="/" element= {<Firstview/>}/>
      </Routes>
    </>
  );
}

export default App;
