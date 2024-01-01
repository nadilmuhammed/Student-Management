

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';


function AssignmentAll() {

    const [ data, setData ] = useState([])

    const getAssignData = async()=>{
        try {
            let response = await axios.get(`http://localhost:4000/api/intern/getassignment/${localStorage.getItem("id")}`)

        } catch (error) {
            
        }
    }

  return (
    <div className='mb-3 rounded bg-slate-700' style={{border:"2px solid gray",padding:"2rem",textAlign:"center",margin:"auto"}}>
      <h1 className='text-3xl text-white font-bold'>Add Assignment</h1>
      <form>
        <div className='main_data' style={{display:"flex",justifyContent:"center",flexDirection:"column",gap:"1rem"}}>
          <div>
            <input className='w-full' type="text" placeholder='Topic Name'
            // value={name}
            // onChange={(e) => setName(e.target.value)} 
            />
          </div>
          <div>
            <textarea className='w-full h-28' type="text" placeholder='Description'
            // value={description}
            // onChange={(e) => setDescription(e.target.value)} 
            />
          </div>
        </div>
        <div className='mt-3'>
          <p className='text-white'>Upload file</p>
          <input type="file" accept='image/pdf image/doc image/ppt' placeholder='' 
        //   value={validto}
        //   onChange={(e)=>setValidTo(e.target.value)}
          />
          </div>
        <div className='mt-3'>
          <p className='text-white'>Due Date:</p><input type="text" placeholder='Due Date' 
        //   value={validto}
        //   onChange={(e)=>setValidTo(e.target.value)}
          />
          </div>
        <div>
            <NavLink to="/intern/assignmentall">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" type='submit'> Add</button>
            </NavLink>
        </div>
      </form>
    </div>
  )
}

export default AssignmentAll