
import React, { useEffect, useState } from 'react'
import Card from "./Card"
import axios from 'axios';

function ViewBatch() {
  
  const [data,setData] =useState([]);
  const [ refresh, setRefresh] = useState(false)


  const getBatchdata = async() =>{
    try {
      const response = await axios.get("http://localhost:4000/api/trainer/getbatchtrainer");
      setData(response.data)
      console.log(response.data,"dtaa");
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(()=>{
    getBatchdata()
  },[refresh])

  return (
    <>
    {/* className='flex justify-center flex-wrap- gap-3' */}
      <div className='flex justify-center gap-3 flex-wrap'>
        {
          data.map((items,key)=>{
            console.log(items,"items");
            return(
              <Card key={key} data={items}/>
            )
          })
        }
      </div>
    </>
  )
}

export default ViewBatch