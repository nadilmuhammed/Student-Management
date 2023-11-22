

import axios from 'axios';
import React, { useState } from 'react'
import { errorToast, successToast } from '../Toastify/Toast';

function AddBatch() {

    const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);


  const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post(`http://localhost:4000/api/admin/createtraine`,{
              name:name,
              email:email
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

  return (
    <>
    <div className='main' style={{textAlign:"center",border:"1px solid black",borderRadius:"10px", margin:"5% 30%"}}>
        <div>
          <h3 style={{padding: "20px",fontSize: "25px", fontWeight: "bolder",fontFamily: "cursive", color:"white"}}>ADD TRAINE</h3>
          
        </div>
      <form onSubmit={handleSubmit}>
      <div className='batch-input' style={{padding:"2rem"}} >
          <input className='input-id' style={{borderRadius:"10px", background:"#DAF7A6", color:"black", border:"none"}} type="text" placeholder='Enter Name'
          value={name}
          onChange={(e) => setName(e.target.value)} />
        </div>
        <div className='batch-input2 mb-3' >
          <input className='input-id' style={{borderRadius:"10px", background:"#DAF7A6", color:"black", border:"none"}} type="text" placeholder='Enter Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
        <button type='submit' className='batch-btn' style={{ background: "darkkhaki"}}>Add</button>
        </div>
      </form>
    </div>
    </>
  )
}

export default AddBatch

