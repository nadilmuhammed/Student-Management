

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { errorToast, successToast } from '../Toastify/Toast';
import Select from 'react-select';

function AddIntern({setRefresh,refresh}) {



   const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [traine,setTraine] = useState(null)
    const [batch, setBatch] = useState(null);
    const [viewBatch, setViewBatch] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);


  const fetchDatatraine = async()=>{
    try {
      const response = await axios.get("http://localhost:4000/api/admin/admintraine");

      setViewBatch(response.data);
    } catch (error) {
      errorToast(error.message);
    }
}

  useEffect(()=>{
    fetchDatatraine()
  },[])
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();

      const mappedOptions = selectedOptions.map(item => (
        item.value
      ) );

      console.log({traine:mappedOptions},'selected user')
  
      try {
          const response = await axios.post(`http://localhost:4000/api/admin/createintern`,{
            name:name,
            email:email,
            traine:mappedOptions,
            batch:batch,
          });
          console.log(response.data,"response");
          if(response.data.result){
            successToast('Created.')
            setRefresh(!refresh)
          }
        } catch (error) {
          errorToast(error.response.data.message);
          // console.log(error.message);
        }
    };


    const mappedOptions = viewBatch.map(item => ({
      value: item.name,
      label: item.name
    }));
  
  return (
    <>
    <div className='main' style={{textAlign:"center",border:"1px solid black",borderRadius:"10px", margin:"1% 30%"}}>
        <div>
          <h3 style={{padding: "20px",fontSize: "25px", fontWeight: "bolder",fontFamily: "cursive", color:"white"}}>ADD INTERN</h3>
          
        </div>
      <form onSubmit={handleSubmit}>
      <div className='batch-input' style={{padding:"2rem"}} >
          <input className='input-id' style={{borderRadius:"10px", background:"#DAF7A6", color:"black", border:"none"}} type="text" placeholder='Enter Name'
          value={name}
          onChange={(e) => setName(e.target.value)} />
        </div>
        <div className='batch-input mb-3' >
          <input className='input-id' style={{borderRadius:"10px", background:"#DAF7A6", color:"black", border:"none"}} type="text" placeholder='Enter Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='dropdown'>
              <Select
              isMulti
              placeholder="Select Traine"
              options={mappedOptions}
              value={selectedOptions}
              onChange={(selectedOptions) => setSelectedOptions(selectedOptions )}
            />
        </div>
        <div className='batch-input mb-3' >
          <input className='input-id' style={{borderRadius:"10px", background:"#DAF7A6", color:"black", border:"none"}} type="text" placeholder='Batch'
          value={batch}
          onChange={(e) => setBatch(e.target.value)} />
        </div>
        <div>
        <button type='submit' className='batch-btn' style={{ background: "darkkhaki"}}>Add</button>
        </div>
      </form>
    </div>
    </>
  )
}

export default AddIntern

