
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { errorToast, successToast } from '../../../Toastify/Toast';
import Select from 'react-select';
import { useParams } from 'react-router-dom';

function Updatebatch() {

   
    const [name, setName] = useState(null);
    const [ getintern,setGetintern ] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [ options,setOptions ] = useState({})
    


    const getallIntern = async()=>{
      try {
        let response = await axios.get(`http://localhost:4000/api/trainer/allinterns/${localStorage.getItem('id')}`);
        setGetintern(response.data);

    let result = response.data.map((items)=>{
          return{
            label:items.name,value:items._id
          }
        })
        setOptions(result)
      } catch (error) {
        console.log(error.message);
      }
    }

    const getBatchID = async(id)=>{
        try {
            let response = await axios.get(`http://localhost/api/trainer/getbatchtrainerID/${id}`);
            console.log(response.data,"batch");
            setName(response.data.name);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(()=>{
      getallIntern();
      getBatchID(id)
    },[])

    const {id} = useParams();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        
       let result= selectedOptions.map((items)=>{
          console.log(items,"items");
          return items.value
        })
        try {
            const response = await axios.put(`http://localhost:4000/api/trainer/updatetrainerbatch/${id}`,{
              name:name,
              interns:result
            })
            console.log(response.data,"data");

            if(response.data){
              successToast("Updated")
            }
        } catch (error) {
            errorToast(error.response.data.message);
        }
    }

    const handleSelectChange = (selectedValues) => {
      setSelectedOptions(selectedValues);
    };

  

  return (
    <>
    <div className='main mb-3' style={{textAlign:"center",border:"none",borderRadius:"10px", margin:"0% 30% 0% 30%",padding:"2rem"}}>
        <div>
          <h3 style={{padding: "20px",fontSize: "25px", fontWeight: "bolder",fontFamily: "cursive", color:"white"}}>UPDATE BATCH</h3>
          
        </div>
      <form onSubmit={handleSubmit}>
      <div className='batch-input mt-3 mb-3' >
          <input className='input-id' style={{borderRadius:"10px", background:"#DAF7A6", color:"black", border:"none"}} type="number" placeholder='Enter Batch number'
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

export default Updatebatch

