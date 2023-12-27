
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { errorToast, successToast } from '../Toastify/Toast';

function AddIntern({setRefresh,refresh}) {

   
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [image,setImage] = useState(null)
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
        const formData = new FormData()
        formData.append('name',name);
        formData.append('email',email);
        formData.append('password',password);
        formData.append('image',image);
        formData.append('trainerReference',trainerId);
        formData.append('Assignedby',localStorage.getItem('id'));
        formData.append('batch',batch);        

          const response = await axios.post(`http://localhost:4000/api/admin/createintern`, formData);
          if(response.data.result){
            console.log(response.data.result,"result");
            successToast('Created.')

            setName('');
            setEmail('');
            setPassword('');
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
    <div className='main' style={{textAlign:"center",border:"none",borderRadius:"10px", margin:"0% 30% 0% 30%"}}>
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
        <div className='batch-input mb-3' >
          <input className='input-id' style={{borderRadius:"10px", background:"#DAF7A6", color:"black", border:"none"}} type="password" placeholder='Enter password'
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className='mb-3'>
          <input
                accept='image/*' // Specify the accepted file types
                className='input-id p-1'
                style={{ borderRadius: '10px', background: '#DAF7A6', color: 'black', border: 'none' }}
                type='file'
                placeholder='upload an image'
                onChange={(e) => setImage(e.target.files[0])} // Use e.target.files to access the FileList
              />
        </div>
        <div className="">
          <select className='selectbox mb-3' onChange={(e)=>handleClickTrainer(e.target.value)}>
            <option value="">Select Traine</option>t
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
          <select className=' selectbox ' onChange={(e)=>setBatch(e.target.value)}>
          <option value="">Select Batch</option>t

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

