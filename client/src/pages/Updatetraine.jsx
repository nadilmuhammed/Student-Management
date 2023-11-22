
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { errorToast, successToast } from '../Toastify/Toast';

function UpdateTraine() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    console.log(name);

    const {id} = useParams();
    const onSubmitAll = async(e) => {
      e.preventDefault();
    try {
      const response  = await axios.put(`http://localhost:4000/api/admin/updatetraine/${id}`,{
          name:name,
          email:email,
      })
      console.log(response.data,'lll');
      console.log(response.data.result);
      if(response.data){
        successToast("Updated")
      }
    } catch (error) {
      console.log(error);
      errorToast(error.response.data.message,"jknfkasn");
    }

  };



    const fetchData= async(id)=>{
        try {
            let response = await axios.get(`http://localhost:4000/api/admin/admintraineID/${id}`);
            console.log(response.data);
            setName(response.data.name);
            console.log(setName,'nsnfknsd');
            setEmail(response.data.email);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(()=>{
        fetchData(id);
    },[])





  return (
    <>
    <div className='main' style={{textAlign:"center",border:"1px solid black",borderRadius:"10px", margin:"5% 30%"}}>
        <div>
          <h3 style={{padding: "20px",fontSize: "25px", fontWeight: "bolder",fontFamily: "cursive", color:"white"}}> UPDATE TRAINE </h3>
          
        </div>
      <form onSubmit={onSubmitAll}>
        <div className='batch-input1 mt-4 mb-3' >
          <input className='input-id' style={{borderRadius:"10px", background:"#DAF7A6", color:"black", border:"none"}} type="text" placeholder='Enter the batch'
          value={name}
          onChange={(e) => setName(e.target.value)} />
        </div>
        <div className='batch-input2 mt-4 mb-3'>
          <input className='input-id' style={{borderRadius:"10px", background:"#DAF7A6", color:"black", border:"none"}} type="text" placeholder='Enter the batch'
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
        </div>
        
        
        <div>
        <button type='submit' className='batch-btn' style={{ background: "darkkhaki"}}>Add</button>
       <Link to="/admin/viewtrainee"><button type='submit' className='batch-btn' style={{ background: "darkkhaki"}}>Batch</button></Link> 
        </div>
      </form>
    </div>
    </>
  )
}

export default UpdateTraine