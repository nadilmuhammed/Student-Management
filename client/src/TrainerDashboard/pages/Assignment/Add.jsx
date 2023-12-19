
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { errorToast, successToast } from '../../../Toastify/Toast';
import "./assignment.css"


function Add() {
  
  const [ name,setName ] = useState('');
  const [ description,setDescription ] = useState('')
  const [ getintern,setGetintern ] = useState([]);
  const [ validfrom,setValidfrom ] = useState('');
  const [ validto,setValidTo ] = useState('');
  const [ iddd,setiddd ] = useState('')
  const [selectedOptions, setSelectedOptions] = useState([]);





  const getallIntern = async()=>{
    try {
      let response = await axios.get(`http://localhost:4000/api/trainer/allinterns/${localStorage.getItem('id')}`);
      setGetintern(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleClickIntern = async(e)=>{
    setGetintern(e.target.value);

    console.log(id,"id");
    
  }

  useEffect(()=>{
    getallIntern()
    handleClickIntern();
  },[])


  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/api/trainer/createassignment",{
        name:name,
        description:description,
        validfrom:validfrom,
        validto:validto,
        interns:iddd,
      });
      if(response.data){
        successToast("created");

        setName('');
        setDescription('');
        setValidfrom('');
        setValidTo('');
      }
    } catch (error) {
      errorToast(error.message);
    }

  }

  const handleClickTrainer = async(id)=>{
    console.log(id,"id");
    setiddd(id);
  }

  



  // const handleCheckboxChange = (option) => {
  //   if (selectedOptions.includes(option)) {
  //     setSelectedOptions(selectedOptions.filter(item => item !== option));
  //   } else {
  //     setSelectedOptions([...selectedOptions, option]);
  //   }
  // };






  return (
    <div className='mb-3 rounded bg-slate-700' style={{border:"2px solid gray",padding:"2rem",textAlign:"center",margin:"auto"}}>
      <h1 className='text-3xl text-white font-bold'>Add Assignment</h1>
      <form onSubmit={handleSubmit}>
        <div className='main_data' style={{display:"flex",justifyContent:"center",flexDirection:"column",gap:"1rem"}}>
          <div>
            <input className='w-full' type="text" placeholder='Topic Name'
            value={name}
            onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <textarea className='w-full h-28' type="text" placeholder='Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div>
            <select className='w-full text-slate-900' onChange={(e)=>handleClickTrainer(e.target.value)}>
              <option disabled value="" >select intern</option>
              <option value="">All</option>
                {
                  getintern.map((item)=>{
                    return(
                      <option value={item._id}>{item.name}</option>   
                    )
                  })
                }
            </select>
                  {/* {getintern.map(option => (
                    <label key={option}>
                      <input
                        type="checkbox"
                        checked={selectedOptions.includes(option)}
                        onChange={() => handleCheckboxChange(option)}
                      />
                      {option}
                    </label>
                  ))} */}

          </div>
        </div>
        
        <div className='mt-3'>
          <p className='text-white'>Validfrom:</p>
          <input type="date" placeholder='valid from' 
            value={validfrom}
            onChange={(e)=>setValidfrom(e.target.value)}/>
          </div>
        <div className='mt-3'>
          <p className='text-white'>Validto:</p><input type="date" placeholder='valid to' 
          value={validto}
          onChange={(e)=>setValidTo(e.target.value)}/>
          </div>
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" type='submit'> Add</button>
        </div>
      </form>
    </div>
  )
}

export default Add