
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { errorToast, successToast } from '../../Toastify/Toast';
import Select from 'react-select';

function AddBatch() {
  const [batch, setBatch] = useState(null);
  const [getBranches, setGetBranches] = useState([]);
    const [getTrainers, setGetTrainers] = useState([]); 
    const [trainerId, setTrainerId] = useState();
    const [ options,setOptions ] = useState({})
    const [selectedOptions, setSelectedOptions] = useState([]);


const fetchData = async()=>{
    try {
      const response = await axios.get("http://localhost:4000/api/admin/admintraine");
      setGetTrainers(response.data);

      let result = response.data.map((items)=>{
        return{
          label:items.name,value:items._id
        }
      })

      setOptions(result)


    } catch (error) {
      errorToast(error.response.data.message);
    }
}


  useEffect(()=>{
    fetchData()
  },[])


    const handleSubmit = async (e) => {
      e.preventDefault();  
  
      try {
        let result= selectedOptions.map((items)=>{
          return items.value
        })


          const response = await axios.post(`http://localhost:4000/api/admin/createBatch`,{
            batch:batch,
            trainerReference:result
          });
          if(response.data.result){
            successToast('Created.')

            setBatch('');
            setTrainerId('');
          }
        } catch (error) {
          errorToast(error.message);
        }
    };

    const handleSelectChange = (selectedValues) => {
      setSelectedOptions(selectedValues);
    };

  return (
    <>
    <div className='main' style={{textAlign:"center",border:"1px solid black",borderRadius:"10px", margin:"5% 30%"}}>
        <div>
          <h3 style={{padding: "20px",fontSize: "25px", fontWeight: "bolder",fontFamily: "cursive", color:"white"}}>ADD BATCH</h3>
          
        </div>
      <form onSubmit={handleSubmit}>
        <div className='batch-input mt-4 mb-3'>
          <input className='input-id' style={{borderRadius:"10px", background:"#DAF7A6", color:"black", border:"none"}} type="text" placeholder='Enter the batch'
          value={batch}
          onChange={(e) => setBatch(e.target.value)} />
        </div>
        <div>
            <Select
              isMulti
              options={options}
              value={selectedOptions}
              onChange={handleSelectChange}
            />
            <div>
              
            </div>
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