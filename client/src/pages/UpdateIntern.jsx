
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { successToast } from '../Toastify/Toast';
import Select from 'react-select';

function UpdateIntern() {
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [batch, setBatch] = useState('');
      // const [traine,setTraine] = useState('')
      const [viewBatch, setViewBatch] = useState([]);
      const [selectedOptions, setSelectedOptions] = useState([]);
      console.log(name);


      const fetchDatatraine = async()=>{
        try {
          const response = await axios.get("http://localhost:4000/api/admin/admintraine");
          setViewBatch(response.data);
        } catch (error) {
          errorToast(error.message);
        }
    }



      const {id} = useParams();
      const onSubmitAll = async(e) => {
        e.preventDefault();

        const mappedOptions = selectedOptions.map(item => (
          item.value
        ) );
  
        console.log({trainerReference:mappedOptions},'selected user')

      try {
        const response  = await axios.put(`http://localhost:4000/api/admin/updateintern/${id}`,{
            name:name,
            email:email,
            batch:batch,
            trainerReference:mappedOptions,
        })
        console.log(response.data,'lll');
        console.log(response.data.result);
        if(response.data){
          successToast("updated")
        }
      } catch (error) {
        console.log(error);
        console.log(error.response.data.message);
      }

    };

    const mappedOptions = viewBatch.map(item => ({
      value: item.name,
      label: item.name
    }));


    const fetchData= async(id)=>{
        try {
            let response = await axios.get(`http://localhost:4000/api/admin/adminintern/${id}`);
            console.log(response.data);
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
        <div className='dropdown mb-3'>
              <Select
              isMulti
              placeholder="Select Traine"
              options={mappedOptions}
              value={selectedOptions}
              onChange={(selectedOptions) => setSelectedOptions(selectedOptions )}
            />
        </div>
        <div className='batch-input mt-4 mb-3'>
          <input className='input-id' style={{borderRadius:"10px", background:"#DAF7A6", color:"black", border:"none"}} type="text" placeholder='Enter the batch'
          value={batch}
          onChange={(e) => setBatch(e.target.value)} />
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