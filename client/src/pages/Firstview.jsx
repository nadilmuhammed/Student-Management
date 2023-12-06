import React from 'react'
import { Link } from 'react-router-dom'

function Firstview() {
  return (
    <>
    <div style={{marginTop:"11rem",backgroundColor:"#F96167"}}>
        <h1 className='text-center mt-5 p-10 text-2xl'>EDU-co</h1>
        <div style={{display:"flex",justifyContent:"space-evenly",padding:"2rem"}}>
            <Link to="/adminlogin">
                <button className='hover:bg-black hover:text-white duration-[700ms] w-40 border-double border-4 border-sky-700 p-3 text-xl'>ADMIN</button>
            </Link>
            <Link to="/trainerlogin">
               <button className='hover:bg-black hover:text-white duration-[1000ms] w-40 border-double border-4 border-sky-500 p-3 text-xl'>TRAINER</button>
            </Link>
            <button className='hover:bg-black hover:text-white duration-[1000ms] w-40 border-double border-4 border-sky-500 p-3 text-xl'>INTERN</button>
        </div>
    </div>
    </>
  )
}

export default Firstview