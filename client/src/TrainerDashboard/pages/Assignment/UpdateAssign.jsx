
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./assignment.css"
import { Link, useParams } from 'react-router-dom';
import { errorToast, successToast } from '../../../Toastify/Toast';
import Select from 'react-select';


function UpdateAssign() {
  
  const [ name,setName ] = useState('');
  const [ description,setDescription ] = useState('')
  const [ getBatch,setGetBatch ] = useState([]);
  const [ getIntern,setGetintern ] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [ options,setOptions ] = useState({})
  const [ data,setData ] = useState([]);
  const [ oneBatch,setOnebatch ] = useState('');
  const [ validfrom,setValidfrom ] = useState('');
  const [ validto,setValidTo ] = useState('');


  const getDataID = async(id)=>{
    try {
      let response = await axios.get(`http://localhost:4000/api/trainer/getassignmentid/${id}`);
      setName(response.data.result.name);
      setDescription(response.data.result.description);
    } catch (error) {
      console.log(error.message);
    }
  }


  const getallIntern = async()=>{
    try {
      let response = await axios.get(`http://localhost:4000/api/trainer/allinterns/${localStorage.getItem('id')}`);
      setGetintern(response.data);

      let result = response.data.map((items)=>{
        return{
          label:items.name,value:items._id
        }
      })  
      console.log(result,"result");
      setOptions(result)
    } catch (error) {
      console.log(error.message);
    }
  }

  const  getBatchDetails = async()=>{
    try {
      let response = await axios.get("http://localhost:4000/api/trainer/getbatchtrainer");
      setGetBatch(response.data);
      console.log(response.data,"loggggg");
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
    getBatchDetails();
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
        batch:oneBatch,
        validfrom:validfrom,
        validto:validto,
        interns:result
      });
      console.log(response.data,"response");
      if(response.data){
        successToast("updated")
      }

    } catch (error) {
      console.log(error.message);
      errorToast(error.message);
    }
  }


  const handleClickBtach = async(id)=>{
    console.log(id,'_____');
    // setBranchId(id)
    setOnebatch(id);

    let dataOne = getBatch.find((item)=> item._id == id)
    let result = dataOne.studentsData.map((items)=>{
      // console.log(items._id,"jvgjvgkv");
      return{
        label:items.name,value:items._id
      }
    });
    // console.log(result,"result");
    setData(result);
   
  }

  const handleSelectChange = (selectedValues) => {
    setSelectedOptions(selectedValues);
  };
  



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
            <select className='w-full text-slate-900' onChange={(e)=>handleClickBtach(e.target.value)}>
              <option disabled value="" >select Batch</option>
              <option value="">All</option>
                {
                  getBatch.map((item)=>{
                    return(
                      <option value={item._id}>{item.name}</option>   
                    )
                  })
                }
            </select>
          </div>
          <div>
            <Select
              isMulti
              options={data}
              value={selectedOptions}
              onChange={handleSelectChange}
            />
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