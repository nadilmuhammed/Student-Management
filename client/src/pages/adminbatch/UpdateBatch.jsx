
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { errorToast, successToast } from '../../Toastify/Toast';

function UpdateBatch() {
  const [batch, setBatch] = useState('');
  const [ trainer, setTrainer] = useState('');
  const [getBranches, setGetBranches] = useState([]);
  const [getTrainers, setGetTrainers] = useState([]); 
  const [trainerId, setTrainerId] = useState();


  const fetchDatatraine = async()=>{
    try {
      const response = await axios.get("http://localhost:4000/api/admin/admintraine");
      setGetTrainers(response.data);
    } catch (error) {
      errorToast(error.message);
    }
}



  const fetchData= async(id)=>{
    try {
        let response = await axios.get(`http://localhost:4000/api/admin/getbatchID/${id}`);
        setBatch(response.data.batch);
        setTrainer(response.data.trainerName)
        console.log(response.data);

    } catch (error) {
        console.log(error.message);
    }
}

useEffect(()=>{
    fetchData(id);
    fetchDatatraine();
},[])



  const {id} = useParams();
    const onSubmitAll = async(e) => {
      e.preventDefault();
    try {
      const response  = await axios.put(`http://localhost:4000/api/admin/updatebatch/${id}`,{
          batch:batch,
          trainerReference:trainerId
      })
      console.log(response.data,"update");
      if(response.data){
        successToast('created.');
      }
    } catch (error) {
      errorToast(error.response.data.message);
    }

  };

  const handleClickTrainer = async(id)=>{
    try {
      setTrainerId(id)
      const response = await axios.get(`http://localhost:4000/api/admin/getTrainebatch/${id}`);
      setGetBranches(response.data)
    } catch (error) {
      console.log(error.message);
    }
  }




  return (
    <>
    <div className='main' style={{textAlign:"center",border:"1px solid black",borderRadius:"10px", margin:"5% 30%"}}>
        <div>
          <h3 style={{padding: "20px",fontSize: "25px", fontWeight: "bolder",fontFamily: "cursive", color:"white"}}>ADD BATCH</h3>
          
        </div>
      <form onSubmit={onSubmitAll}>
        <div className='batch-input' style={{padding:"2rem"}}>
          <input className='input-id' style={{borderRadius:"10px", background:"#DAF7A6", color:"black", border:"none"}} type="text" placeholder='Enter the batch'
          value={batch}
          onChange={(e) => setBatch(e.target.value)} />
          <input disabled className='input-id mt-4' style={{borderRadius:"10px", background:"#DAF7A6", color:"black", border:"none"}} type="text" placeholder='Enter the batch'
          value={trainer}
          onChange={(e) => setTrainer(e.target.value)} />
        </div>
        <div className='dropdown'>
        <select name="" id="" onChange={(e)=>handleClickTrainer(e.target.value)}>
               <option value="">choose</option>
                  {
                    getTrainers.map((item)=>{
                      return(
                          <option value={item._id}>{item.name}</option>
                        )
                    })
                  }
        </select>
        </div>
        <div>
        <button type='submit' className='batch-btn' style={{ background: "darkkhaki"}}>Add</button>
       <Link to="/admin/viewbatches"><button type='submit' className='batch-btn' style={{ background: "darkkhaki"}}>Batch</button></Link> 
        </div>
      </form>
    </div>
    </>
  )
}

export default UpdateBatch