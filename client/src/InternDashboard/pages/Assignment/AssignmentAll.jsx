

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import { errorToast, successToast } from '../../../Toastify/Toast';


function AssignmentAll() {

  const [ file, setfile ] = useState('')
  const [store,setStore ] = useState({
    name:"",
    description:"",
    validto:"",
    file:"",
  });

  const handleChange = (e)=>{
    setStore({ ...store,[e.target.name]: e.target.value });
  }
   
    // const [ name, setName ] = useState('')
    // const [ description, setDescription ] = useState('')
    // const [ validto, setValidTo ] = useState('')
   

   const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      let formData = new FormData;
      formData.append("file", file)
      formData.append("Assignedby", localStorage.getItem("id"))
      formData.append("assignmentid",store._id)

      let response = await axios.post("http://localhost:4000/api/intern/createassignment", formData);
      console.log(response.data,"intern data");
      if(response.data){
        successToast("Submitted")
      }
    } catch (error) {
      errorToast(error.response.data.message)
    }
   }



   const { id } = useParams()
      const getAssignData = async(id)=>{
        try {
          const response = await axios.get(`http://localhost:4000/api/intern/getassignmentall/${id}`)
            console.log(response.data,"data");
            setStore(response.data)
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(()=>{
      getAssignData(id)
    },[])

    const formattedDate = `${new Date(store.validto).getUTCDay()}-${new Date(store.validto).getUTCMonth()}-${new Date(store.validto).getUTCFullYear()}`;


  return (
    <div className='mb-3 rounded bg-slate-700' style={{border:"2px solid gray",padding:"2rem",textAlign:"center",margin:"auto"}}>
      <h1 className='text-3xl text-white font-bold'>Add Assignment</h1>
      <form onSubmit={handleSubmit}>
        <div className='main_data' style={{display:"flex",justifyContent:"center",flexDirection:"column",gap:"1rem"}}>
          <div>
            <input className='w-full' type="text" placeholder='Topic Name'
            value={store.name}
            onChange={handleChange} 
            name='name'
            readOnly={true}
            />
          </div>
          <div>
            <textarea className='w-full h-28' type="text" placeholder='Description'
            value={store.description}
            onChange={handleChange} 
            name='description'
            readOnly={true}
            />
          </div>
        </div>
        <div className='mt-3'>
          <p className='text-white'>Due Date:</p><input type="text" placeholder='Due Date' 
          value={formattedDate}
          onChange={handleChange}
          name='ValidTo'
          readOnly={true}
          />
          </div>
        <div className='mt-3'>
          <p className='text-white'>Upload file</p>
          <input 
          type="file" 
          name='file'
          accept='.pdf, .doc, .ppt' 
          placeholder='Uplaod work' 
          onChange={(e)=>{
            setfile(e.target.files[0])
          }}
          />
          </div>
        <div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" type='submit'> Submit</button>
        </div>
      </form>
    </div>
  )
}

export default AssignmentAll