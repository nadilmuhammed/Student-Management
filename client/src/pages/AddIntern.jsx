
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { errorToast, successToast } from '../Toastify/Toast';

function AddIntern({setRefresh,refresh}) {



   const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [getBranches, setGetBranches] = useState([]);
    const [getTrainers, setGetTrainers] = useState([]);
  const [batch, setBatch] = useState([]);
  const [trainerId, setTrainerId] = useState();


  const fetchDatatraine = async()=>{
    try {
      const response = await axios.get("http://localhost:4000/api/admin/admintraine");
      setGetTrainers(response.data);
    } catch (error) {
      errorToast(error.message);
    }
}

  useEffect(()=>{
    fetchDatatraine();
  },[])

  
    const handleSubmit = async (e) => {
      e.preventDefault();

  
      try {
          const response = await axios.post(`http://localhost:4000/api/admin/createintern`,{
            name:name,
            email:email,
            trainerReference:trainerId,
            batch:batch,
          });
          if(response.data.result){
            successToast('Created.')
            setRefresh(!refresh)
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
    <div className='main' style={{textAlign:"center",border:"1px solid black",borderRadius:"10px", margin:"1% 30%"}}>
        <div>
          <h3 style={{padding: "20px",fontSize: "25px", fontWeight: "bolder",fontFamily: "cursive", color:"white"}}>ADD INTERN</h3>
          
        </div>
      <form onSubmit={handleSubmit}>
      <div className='batch-input mt-3 mb-3' >
          <input className='input-id' style={{borderRadius:"10px", background:"#DAF7A6", color:"black", border:"none"}} type="text" placeholder='Enter Name'
          value={name}
          onChange={(e) => setName(e.target.value)} />
        </div>
        <div className='batch-input mb-3' >
          <input className='input-id' style={{borderRadius:"10px", background:"#DAF7A6", color:"black", border:"none"}} type="text" placeholder='Enter Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
        </div>
        {/* <div className='dropdown mb-3'>
              <Select
              isMulti
              placeholder="Select Traine"
              options={mappedOptions}
              value={selectedOptions}
              onChange={(selectedOptions) => setSelectedOptions(selectedOptions )}
            />
        </div>*/}
        <div className="">
          <select name="" id="" onChange={(e)=>handleClickTrainer(e.target.value)}>
            <option value="">choose</option>t
            {
              getTrainers.map((item)=>{
                return(
                    <option value={item._id}>{item.name}</option>
                  )
              })
            }
          </select>
        </div>
        <div className='batch-input mb-3' > 
          {/* <input className='input-id' style={{borderRadius:"10px", background:"#DAF7A6", color:"black", border:"none"}} type="text" placeholder='Batch'
          value={batch}
          onChange={(e) => setBatch(e.target.value)} /> */}
          <select name="" id="" onChange={(e)=>setBatch(e.target.value)}>
          <option value="">choose</option>t

            {
              getBranches.map((item)=>{
                return(
                  <option value={item._id}>{item.batch}</option>
                )
              })

            }
          </select>
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

