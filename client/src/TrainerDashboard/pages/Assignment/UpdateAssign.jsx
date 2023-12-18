
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./assignment.css"
import { Link, useParams } from 'react-router-dom';
import { errorToast, successToast } from '../../../Toastify/Toast';


function UpdateAssign() {
  
  const [ name,setName ] = useState('');
  const [ description,setDescription ] = useState('')
  const [ getintern,setGetintern ] = useState([]);
  const [ validfrom,setValidfrom ] = useState('');
  const [ validto,setValidTo ] = useState('');
  const [ iddd,setiddd ] = useState('');


  const getallIntern = async()=>{
    try {
      let response = await axios.get(`http://localhost:4000/api/trainer/allinterns/${localStorage.getItem('id')}`);
      setGetintern(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

 

  const getDataID = async(id)=>{
    try {
      let response = await axios.get(`http://localhost:4000/api/trainer/getassignmentid/${id}`);
      setName(response.data.result.name);
      setDescription(response.data.result.description);
      setValidfrom(response.data.result.validfrom);
      setValidTo(response.data.result.validto);
      setiddd(response.data.result.iddd)
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleClickIntern = async(e)=>{
    setGetintern(e.target.value);
    console.log(e.target.value);
  }

  useEffect(()=>{
    getDataID(id)
    getallIntern()
    handleClickIntern();
  },[])


  const {id} =useParams();
  const handleSubmit = async(e) =>{
    e.preventDefault();

    try {

      const response = await axios.put(`http://localhost:4000/api/trainer/updateassignment/${id}`,{
        name:name,
        description:description,
        interns:iddd,
        validfrom:validfrom,
        validto:validto
      });
      console.log(response.data,"response");
      if(response.data){
        successToast("updated")
      }

    } catch (error) {
      errorToast(error.response.data.message);
    }
  }


  const handleClickTrainer = async(id)=>{
    setiddd(id);
    console.log(id);
  }

  



  return (
    <div className='mb-3' style={{border:"2px solid gray",padding:"2rem",textAlign:"center",margin:"auto"}}>
      <h1 className='text-3xl font-bold'>Add Assignment</h1>
      <form onSubmit={handleSubmit}>
        <div className='main_data' style={{display:"flex",justifyContent:"center",gap:"1rem"}}>
          <div>
            <input className='w-full rounded-md' type="text" placeholder='Topic Name'
            value={name}
            onChange={(e) => setName(e.target.value)} 
            />
          </div>
          <div>
            <textarea className='w-full h-28 rounded-md' type="text" placeholder='Description'
            value={description}

            onChange={(e) => setDescription(e.target.value)} 
            />
          </div>
          <div>
            <select className='w-full text-slate-900' onChange={(e)=>handleClickTrainer(e.target.value)}>
              <option disabled value="" >select intern</option>
                {
                  getintern.map((item)=>{
                    return(
                      <option value={item._id}>{item.name}</option>   
                    )
                  })
                }
            </select>
          </div>
        </div>
        
        <div className='mt-3'>
          <p>Validfrom:</p>
          <input type="date" placeholder='valid from' 
            value={validfrom}
            onChange={(e)=>setValidfrom(e.target.value)}
            />
          </div>
        <div className='mt-3'>
          <p>Validto:</p><input type="date" placeholder='valid to' 
          value={validto}
          onChange={(e)=>setValidTo(e.target.value)}
          />
          </div>
        <div className='flex justify-center gap-3 mt-4'>
          <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type='submit'> Add</button>
          </div>
          <div>
            <Link to="/trainer/viewassignment"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">View</button></Link>
          </div>

        </div>
      </form>
    </div>
  )
}

export default UpdateAssign