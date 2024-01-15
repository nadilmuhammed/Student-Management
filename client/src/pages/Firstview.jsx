import React from 'react'
import { Link } from 'react-router-dom'
import { RiAdminFill } from "react-icons/ri";
import { PiStudentFill } from "react-icons/pi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import landingimg from "../images/landing.jpg"

function Firstview() {
  return (
    <>
      <h1 style={{textAlign:"center",fontSize:"2.5rem",fontWeight:"bolder",fontFamily:"monospace"}}>Welcome to <span style={{color:"orange"}}>EDU</span><span style={{color:"green"}}>-co</span></h1>
    <div className='flex justify-center items-center' style={{width:"100%",height:"90vh"}}>
      <div className='flex sm:flex-col lg:flex-row justify-center items-center' style={{width:"90%", height:"90vh"}}>
        <div>
          <img className='w-full' src={landingimg} />
        </div>
        <div className='flex-col justify-center items-center mt-4'>
          <div>
          <p className='text-center text-2xl font-bold'>Select to Login</p>
          </div>
          <div className='flex justify-center items-center gap-4 mt-3'>
                <Link to="/adminlogin">
                    <button className='p-3 bg-blue-500 text-white hover:bg-yellow-500 font-serif trainsition duration-500 text-2xl rounded'><RiAdminFill/>ADMIN</button>
                </Link>
                <Link to="/trainerlogin">
                  <button className='p-3 bg-blue-500 text-white hover:bg-yellow-500 font-serif trainsition duration-500 text-2xl rounded'><LiaChalkboardTeacherSolid/>TRAINER</button>
                </Link>
                <Link to="/internlogin">
                  <button className='p-3 bg-blue-500 text-white hover:bg-yellow-500 font-serif trainsition duration-500 text-2xl rounded'><PiStudentFill/>INTERN</button>
                </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Firstview