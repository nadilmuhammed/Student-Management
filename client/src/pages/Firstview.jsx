import React from 'react'
import { Link } from 'react-router-dom'
import { RiAdminFill } from "react-icons/ri";
import { PiStudentFill } from "react-icons/pi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";

function Firstview() {
  return (
    <>
    <h1 style={{textAlign:"center",fontSize:"2.5rem",fontWeight:"bolder",fontFamily:"monospace"}}>Welcome to <span style={{color:"orange"}}>EDU</span><span style={{color:"green"}}>-co</span></h1>
    <div className='landing'>
      <div>
        <img className='imglanding' src="https://img.freepik.com/free-vector/student-using-laptop-studying-desk_1262-21429.jpg?size=626&ext=jpg&ga=GA1.1.637825648.1696832292&semt=ais" />
      </div>
      <div style={{display:"flex", flexDirection:"column",justifyContent:"space-evenly",padding:"2rem",gap:"10px"}}>
        <div>
        <p style={{textAlign:'center', fontSize:"20px"}}>Select to Login</p>
        </div>
        <div className=''>
              <Link to="/adminlogin">
                  
                  <button><RiAdminFill/>ADMIN</button>
              </Link>
              <Link to="/trainerlogin">
                <button><LiaChalkboardTeacherSolid/>TRAINER</button>
              </Link>
              <Link>
                <button><PiStudentFill/>INTERN</button>
              </Link>
        </div>
      </div>
    </div>
    </>
  )
}

export default Firstview