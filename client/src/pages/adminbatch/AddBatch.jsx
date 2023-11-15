
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { errorToast, successToast } from '../../Toastify/Toast';
import Select from 'react-select';

function AddBatch() {
  const [batch, setBatch] = useState(null);
  const [viewBatch, setViewBatch] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);



  const options =[
    { value: 'option1', label: 'Option 1'},
    { value: 'option2', label: 'Option 2'},
  ]


const fetchData = async()=>{
    try {
      const response = await axios.get("http://localhost:4000/api/admin/admintraine");

      setViewBatch(response.data);
    } catch (error) {
      errorToast(error.message);
    }
}

  useEffect(()=>{
    fetchData()
  },[])


    const handleSubmit = async (e) => {
      e.preventDefault();

      const mappedOptions = selectedOptions.map(item => (
        item.value
      ) );
  
  
      console.log({trainerReference:mappedOptions},'selected user')
      try {
          const response = await axios.post(`http://localhost:4000/api/admin/createBatch`,{
            batch:batch,
            trainerReference:mappedOptions
          });
          console.log(response.data,"response");
          if(response.data.result){
            successToast('Created.')
            setRefresh(!refresh)
          }
        } catch (error) {
          errorToast(error.response.data.message);
          // console.log(error.message);
        }
    };


    const mappedOptions = viewBatch.map(item => ({
      value: item.name,
      label: item.name
    }));

  return (
    <>
    <div className='main' style={{textAlign:"center",border:"1px solid black",borderRadius:"10px", margin:"5% 30%"}}>
        <div>
          <h3 style={{padding: "20px",fontSize: "25px", fontWeight: "bolder",fontFamily: "cursive", color:"white"}}>ADD BATCH</h3>
          
        </div>
      <form onSubmit={handleSubmit}>
        <div className='batch-input' style={{padding:"2rem"}}>
          <input className='input-id' style={{borderRadius:"10px", background:"#DAF7A6", color:"black", border:"none"}} type="text" placeholder='Enter the batch'
          value={batch}
          onChange={(e) => setBatch(e.target.value)} />
        </div>
        <div className='dropdown'>
              

              <Select
              isMulti
              options={mappedOptions}
              value={selectedOptions}
              onChange={(selectedOptions) => setSelectedOptions(selectedOptions )}
            />
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