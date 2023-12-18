
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { errorToast, successToast } from '../../../Toastify/Toast';
import { useParams } from 'react-router-dom';

function Addbatch({setRefresh,refresh}) {

   
    const [name, setName] = useState(null);
    const [intern, setIntern] = useState(null);
    const [options, setOptions] = useState(null);

    const [selectedOptions, setSelectedOptions] = useState([]);


    const handleSubmit = async(e)=>{
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:4000/api/trainer/createBatchtrainer",{
              name:name,
              interns:intern
            })

            if(response.data){
              successToast("Created")

              setName('');
              setIntern('');
            }
        } catch (error) {
            errorToast(error.response.data.message);
        }
    }

    const handleCheckboxChange = (option) => {
      if (selectedOptions.includes(option)) {
        setSelectedOptions(selectedOptions.filter(item => item !== option));
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    };

  

  return (
    <>
    <div className='main mb-3' style={{textAlign:"center",border:"none",borderRadius:"10px", margin:"0% 30% 0% 30%",padding:"2rem"}}>
        <div>
          <h3 style={{padding: "20px",fontSize: "25px", fontWeight: "bolder",fontFamily: "cursive", color:"white"}}>ADD INTERN</h3>
          
        </div>
      <form onSubmit={handleSubmit}>
      <div className='batch-input mt-3 mb-3' >
          <input className='input-id' style={{borderRadius:"10px", background:"#DAF7A6", color:"black", border:"none"}} type="text" placeholder='Enter Name'
          value={name}
          onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <select name="" onChange={(e)=> setIntern(e.target.value)}>
            <option type="checkbox" value="">name</option>
            {/* {options.map(option => (
              <label key={option}>
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                />
                {option}
              </label>
            ))} */}
          </select>
           
        </div>
        
        <div>
        <button type='submit' className='batch-btn' style={{ background: "darkkhaki"}}>Add</button>
        </div>
      </form>
    </div>
    </>
  )
}

export default Addbatch

