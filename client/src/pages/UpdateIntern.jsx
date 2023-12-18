
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { errorToast, successToast } from '../Toastify/Toast';
import Select from 'react-select';

function UpdateIntern() {
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [image,setImage] = useState('');
      const [batch, setBatch] = useState('');
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



      const {id} = useParams();
      const onSubmitAll = async(e) => {
        e.preventDefault();

      try {

        const formData = new FormData()
        formData.append('name',name);
        formData.append('email',email);
        formData.append('image',image);
        formData.append('trainerReference',trainerId);
        formData.append('batch',batch);        

        const response  = await axios.put(`http://localhost:4000/api/admin/updateintern/${id}`,formData)
        console.log(response.data,'lll');
        console.log(response.data.result);
        if(response.data){
          successToast("updated")
        }
      } catch (error) {
        console.log(error);
        errorToast(error.response.data.message);
      }

    };


    const fetchData= async(id)=>{
        try {
            let response = await axios.get(`http://localhost:4000/api/admin/adminintern/${id}`);
            console.log(response.data,"data");
            setName(response.data.name);
            console.log(setName,'nsnfknsd');
            setEmail(response.data.email);
            // setTraine(response.data.traine);
            setBatch(response.data.batch);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(()=>{
        fetchData(id);
        fetchDatatraine();
    },[])


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
          <h3 style={{padding: "20px",fontSize: "25px", fontWeight: "bolder",fontFamily: "cursive", color:"white"}}> UPDATE INTERN </h3>
          
        </div>
      <form onSubmit={onSubmitAll}>
        <div className='batch-input mt-4 mb-3' >
          <input className='input-id' style={{borderRadius:"10px", background:"#DAF7A6", color:"black", border:"none"}} type="text" placeholder='Enter the batch'
          value={name}
          onChange={(e) => setName(e.target.value)} />
        </div>
        <div className='batch-input mt-4 mb-3'>
          <input className='input-id' style={{borderRadius:"10px", background:"#DAF7A6", color:"black", border:"none"}} type="text" placeholder='Enter Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
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
        <div className='dropdown mb-3'>
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
        <div className='batch-input mt-4 mb-3'>
          {/* <input className='input-id' style={{borderRadius:"10px", background:"#DAF7A6", color:"black", border:"none"}} type="text" placeholder='Enter the batch'
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
       <Link to="/admin/viewIntern"><button type='submit' className='batch-btn' style={{ background: "darkkhaki"}}>View</button></Link> 
        </div>
      </form>
    </div>
    </>
  )
}

export default UpdateIntern