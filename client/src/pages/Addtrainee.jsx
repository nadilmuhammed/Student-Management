
import axios from 'axios';
import React, { useState } from 'react'
import { errorToast, successToast } from '../Toastify/Toast';

function AddBatch() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState('');
    const [id_no, setIDno] = useState('');

 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('username', username);
      formData.append('password', password);
      formData.append('image', image); // Append the file directly

      formData.append('id_no', id_no);

      const response = await axios.post('http://localhost:4000/api/admin/createtraine', formData  );

      console.log(response.data, 'response');
      if (response.data.result) {
        successToast('Created.');
      }
    } catch (error) {
      errorToast(error.response.data.message);
    }
  };

  return (
    <>
    <div className='main' style={{textAlign:"center",border:"1px solid black",borderRadius:"10px", margin:"1% 30%"}}>
        <div>
          <h3 style={{padding: "20px",fontSize: "25px", fontWeight: "bolder",fontFamily: "cursive", color:"white"}}>ADD TRAINE</h3>
          
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
              placeholder='upload an image'
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
        </div>

      </form>
    </div>
    </>
  )
}

export default AddBatch

