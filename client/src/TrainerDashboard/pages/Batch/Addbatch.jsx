
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { errorToast, successToast } from '../../../Toastify/Toast';
import Select from 'react-select';

function Addbatch() {

   
    const [name, setName] = useState(null);
    const [ getintern,setGetintern ] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [ options,setOptions ] = useState({})
    


    const getallIntern = async()=>{
      try {
        let response = await axios.get(`http://localhost:4000/api/trainer/allinterns/${localStorage.getItem('id')}`);
        setGetintern(response.data);

        /* to get intern id and name from response bescuse 
        it has to append to value as _id and label as name*/
    let result = response.data.map((items)=>{
          return{
            label:items.name,value:items._id
          }
        })
        
        /*declaring a state to store the data and
         get globally (have to assign state in html code) */
        setOptions(result)
      } catch (error) {
        console.log(error.message);
      }
    }

    useEffect(()=>{
      getallIntern();
    },[])

    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(selectedOptions,"select");
        
       let result= selectedOptions.map((items)=>{
          console.log(items,"items");
          return items.value
        })

       console.log(result,"result");
        try {
            const response = await axios.post("http://localhost:4000/api/trainer/createBatchtrainer",{
              name:name,
              interns:result
            })

            if(response.data.response){
              successToast("Created")

              setName('');
              // setIntern('');
            }
        } catch (error) {
            errorToast(error.response.data.message);
        }
    }

    const handleSelectChange = (selectedValues) => {
      setSelectedOptions(selectedValues);
    };

    // const handleCheckboxChange = (option) => {
    //   if (selectedOptions.includes(option)) {
    //     setSelectedOptions(selectedOptions.filter(item => item !== option));
    //   } else {
    //     setSelectedOptions([...selectedOptions, option]);
    //   }
    // };

  

  return (
    <>
    <div className='main mb-3' style={{textAlign:"center",border:"none",borderRadius:"10px", margin:"0% 30% 0% 30%",padding:"2rem"}}>
        <div>
          <h3 style={{padding: "20px",fontSize: "25px", fontWeight: "bolder",fontFamily: "cursive", color:"white"}}>ADD BATCH</h3>
          
        </div>
      <form onSubmit={handleSubmit}>
      <div className='batch-input mt-3 mb-3' >
          <input className='input-id' style={{borderRadius:"10px", background:"#DAF7A6", color:"black", border:"none"}} type="text" placeholder='Enter batch name'
          value={name}
          onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
            <Select
              isMulti
              options={options}
              value={selectedOptions}
              onChange={handleSelectChange}
            />
            <div>
            {selectedOptions.map((items) =>
            (
              <div>
                <div key={items.value}>{items.label}</div>
              </div>

              ))}
              
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

export default Addbatch

