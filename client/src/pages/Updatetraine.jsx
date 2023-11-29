
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { errorToast, successToast } from '../Toastify/Toast';

function UpdateTraine() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [image, setImage] = useState(null);
    const [id_no, setIDno] = useState(null);


    const {id} = useParams();
    const onSubmitAll = async(e) => {
      e.preventDefault();
    try {

      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('username', username);
      formData.append('password', password);
      formData.append('image', image); // Append the file directly

      formData.append('id_no', id_no);




      const response  = await axios.put(`http://localhost:4000/api/admin/updatetraine/${id}`, formData );
      console.log(response.data,'lll');
      console.log(response.data.result);
      if(response.data){
        successToast("Updated")
      }
    } catch (error) {
      // console.log(error);
      errorToast(error.response.data.message,"jknfkasn");
    }

  };



    const fetchData= async(id)=>{
        try {
            let response = await axios.get(`http://localhost:4000/api/admin/admintraineID/${id}`);
            setName(response.data.name);
            setEmail(response.data.email)
            setUsername(response.data.username);
            setPassword(response.data.password);
            setImage(response.data.image);
            setIDno(response.data.id_no);
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
          <input className='input-id' style={{borderRadius:"10px", background:"#DAF7A6", color:"black", border:"none"}} type="text" placeholder='Enter the name'
          value={name}
          onChange={(e) => setName(e.target.value)} />
        </div>
        <div className='batch-input2 mt-4 mb-3'>
          <input className='input-id' style={{borderRadius:"10px", background:"#DAF7A6", color:"black", border:"none"}} type="email" placeholder='Enter Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='batch-input mb-3' >
          <input className='input-id' style={{borderRadius:"10px", background:"#DAF7A6", color:"black", border:"none"}} type="text" placeholder='Enter username'
          value={username}
          onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className='batch-input mb-3' >
          <input className='input-id' style={{borderRadius:"10px", background:"#DAF7A6", color:"black", border:"none"}} type="password" placeholder='Enter password'
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className='batch-input mb-3' >
        <input
              accept='image/*' // Specify the accepted file types
              className='input-id'
              style={{ borderRadius: '10px', background: '#DAF7A6', color: 'black', border: 'none' }}
              type='file'
              placeholder='Enter image'
              onChange={(e) => setImage(e.target.files[0])} // Use e.target.files to access the FileList
            />
        </div>
        <div className='batch-input mb-3' >
          <input className='input-id' style={{borderRadius:"10px", background:"#DAF7A6", color:"black", border:"none"}} type="text" placeholder='Enter ID'
          value={id_no}
          onChange={(e) => setIDno(e.target.value)} />
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