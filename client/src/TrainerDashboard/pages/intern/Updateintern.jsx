
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { errorToast,successToast } from '../../../Toastify/Toast';

function UpdateIntern() {
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [image,setImage] = useState('');
      const [getInterns, setGetInterns] = useState([]);   


      const fetchDatatraine = async()=>{
        try {
          const response = await axios.get(`http://localhost:4000/api/trainer/allinterns/${localStorage.getItem('id')}`);
          setGetInterns(response.data);
          console.log(response.data);
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

            const response  = await axios.put(`http://localhost:4000/api/trainer/trainerupdateintern/${id}`,formData)
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


    const fetchData= async()=>{
        try {
            let response = await axios.get(`http://localhost:4000/api/trainer/allinterns/${localStorage.getItem('id')}`);
            console.log(response.data);
            setName(response.data.name);
            console.log(response.data.name,'nsnfknsd');
            setEmail(response.data.email);
            console.log(response.data.email,"email");
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(()=>{
        fetchData(id);
        fetchDatatraine();
    },[])
   




  return (
    <>
    <div className='main' style={{textAlign:"center",border:"1px solid black",borderRadius:"10px", margin:"5% 30%"}}>
        <div>
          <h3 style={{padding: "20px",fontSize: "25px", fontWeight: "bolder",fontFamily: "cursive", color:"white"}}> UPDATE INTERN </h3>
          
        </div>
      <form onSubmit={onSubmitAll}>
        <div className='batch-input mt-4 mb-3' >
          <input className='input-id' style={{borderRadius:"10px", background:"#DAF7A6", color:"black", border:"none"}} type="text" placeholder='Enter name'
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
                accept='image/jpg/png/jpeg' // Specify the accepted file types
                className='input-id p-1'
                style={{ borderRadius: '10px', background: '#DAF7A6', color: 'black', border: 'none' }}
                type='file'
                placeholder='upload an image'
                onChange={(e) => setImage(e.target.files[0])} // Use e.target.files to access the FileList
              />
        </div>
        <div>
        <button type='submit' className='batch-btn' style={{ background: "darkkhaki"}}>Add</button>
       <Link to="/trainer/viewintern"><button type='submit' className='batch-btn' style={{ background: "darkkhaki"}}>View</button></Link> 
        </div>
      </form>
    </div>
    </>
  )
}

export default UpdateIntern