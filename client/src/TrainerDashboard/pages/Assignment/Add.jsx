
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { errorToast, successToast } from '../../../Toastify/Toast';
import "./assignment.css"


function Add() {
  
  const [ name,setName ] = useState('');
  const [ description,setDescription ] = useState('')
  const [ getintern,setGetintern ] = useState([]);
  const [ validfrom,setValidfrom ] = useState('');
  const [ validto,setValidTo ] = useState('');





  const getallIntern = async()=>{
    try {
      let response = await axios.get(`http://localhost:4000/api/trainer/allinterns/${localStorage.getItem('id')}`);
      setGetintern(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(()=>{
    getallIntern()
  },[])


  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/api/trainer/createassignment",{
        name:name,
        description:description,
        interns:getintern,
        validfrom:validfrom,
        validto:validto,
      });
      if(response.data){
        successToast("created");

        setName('');
        setDescription('');
        setGetintern([]);
        setValidfrom('');
        setValidTo('');
      }
    } catch (error) {
      errorToast(error.message);
    }

  }






  return (
    <div className='mb-3' style={{border:"2px solid gray",padding:"2rem",textAlign:"center",margin:"auto"}}>
      <h1>Add Assignment</h1>
      <form onSubmit={handleSubmit}>
        <div style={{display:"flex",justifyContent:"space-evenly",gap:"2rem"}}>
          <div>
            <input type="text" placeholder='Topic Name'
            value={name}
            onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <textarea type="text" placeholder='Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div>
          <select className='w-40 text-slate-900' onChange={(e)=>setGetintern(e.target.value)}>
            <option disabled value="" >select intern</option>
              {
                getintern.map((item)=>{
                  return(
                    <option value={item._id}>{item.name}</option>   
                  )
                })
              }
          </select>
        </div>
        </div>
        
        <div>
        <span>Validfrom:</span><input type="date" placeholder='valid from' 
          value={validfrom}
          onChange={(e)=>setValidfrom(e.target.value)}/>
        </div>
        <div>
        <span>Validto:</span><input type="date" placeholder='valid to' 
         value={validto}
         onChange={(e)=>setValidTo(e.target.value)}/>
        </div>
        <div>
          <button type='submit'> Add</button>
        </div>
      </form>
    </div>
  )
}

export default Add