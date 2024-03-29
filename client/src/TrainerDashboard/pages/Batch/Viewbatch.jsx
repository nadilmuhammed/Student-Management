
import React, { useEffect, useState } from 'react'
import Card from "./Card"
import axios from 'axios';
import Addbatch from './Addbatch';

function ViewBatch() {
  
  const [data,setData] =useState([]);
  const [ refresh, setRefresh] = useState(false)
  const [ status, setStatus] = useState(false)
  
  const getBatchdata = async() =>{
    try {
      const response = await axios.get(`http://localhost:4000/api/trainer/getbatchtrainerID/${localStorage.getItem("id")}`);
      setData(response.data)
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(()=>{
    getBatchdata()
  },[refresh])

  return (
    <>
    {status ? (
        <>
        <Addbatch setRefresh={setRefresh} refresh={refresh} />
        </>        
    ): (
      <div className='flex justify-center gap-3 flex-wrap'>
           {
            data.map((items,key)=>{
              console.log(items,"items");
              return(
                <Card key={key} data={items} setRefresh={setRefresh} refresh={refresh}/>
              )
            })
          }
        </div>
    )}
    </>
  )
}

export default ViewBatch