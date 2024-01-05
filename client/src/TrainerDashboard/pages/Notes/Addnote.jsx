import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import { errorToast, successToast } from '../../../Toastify/Toast';


function Addnote() {

  const [ name,setName ] = useState('');
  const [ description,setDescription ] = useState('');
  const [ file,setFile ] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [ options,setOptions ] = useState({})
  const [ getBatch, setGetBatch ] = useState([]);
  const [ oneBatch,setOnebatch ] = useState('');
  const [ data,setData ] = useState([]);
  const [ getintern,setGetintern ] = useState([]);


  const getallIntern = async()=>{
    try {
      let response = await axios.get(`http://localhost:4000/api/trainer/allinterns/${localStorage.getItem('id')}`);
      setSelectedOptions(response.data);

      /* to get intern id and name from response bescuse 
      it has to append to value as _id and label as name*/
       let result = response.data.map((items)=>{
        return{
          label:items.name,value:items._id
        }
      })  
      console.log(result);
      /*declaring a state to store the data and
       get globally (have to assign state in html code) */
      setOptions(result)
    } catch (error) {
      console.log(error.message);
    }
  }

  const  getBatchDetails = async()=>{
    try {
      let response = await axios.get(`http://localhost:4000/api/trainer/getbatchtrainerID/${localStorage.getItem("id")}`);
      setGetBatch(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleClickIntern = async(e)=>{
    setGetintern(e.target.value);
  }

  useEffect(()=>{
    getallIntern()
    getBatchDetails();
    handleClickIntern();
  },[])



  const handleSubmit = async(e)=>{
    e.preventDefault();

    let result= selectedOptions.map((items)=>{
      return items.value
    })
    
    console.log(result);


    try {
      let formData = new FormData()
      formData.append('name', name)
      formData.append('description', description)
      formData.append('batch',oneBatch)
      // formData.append('interns',result)
      result.forEach((intern, index) => {
        formData.append(`interns[${index}]`, intern);
      });
      formData.append('file', file)
      formData.append('Assignedby', localStorage.getItem("id"));


      let response = await axios.post("http://localhost:4000/api/trainer/createnotes", formData);
      console.log(response.data,"response");
      if(response.data){
        successToast("Created")

        setName('');
        setDescription('');
      } 
    } catch (error) {
      errorToast(error.response.data.message)
    }
  }

  const handleClickBtach = async(id)=>{
    console.log(id,'_____');
    // setBranchId(id)
    setOnebatch(id);

    let dataOne = getBatch.find((item)=> item._id == id)
    let result = dataOne.studentsData.map((items)=>{
      
      console.log(items._id,"jvgjvgkv");
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
    <div className='mb-3 rounded bg-slate-700' style={{border:"2px solid gray",padding:"2rem",textAlign:"center",margin:"auto"}}>
      <h1 className='text-3xl text-white font-bold'>Add Note</h1>
      <form onSubmit={handleSubmit}>
        <div className='main_data'>
            <input className='w-full' type="text" placeholder='Name'
            value={name}
            onChange={(e)=> setName(e.target.value)}
             />
        </div>
          <div className='mt-3'>
            <textarea className='w-full h-28' type="text" placeholder='Topics of notes'
            value={description}
            onChange={(e)=> setDescription(e.target.value)}
             />
          </div>

          <div className='mt-2'>
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
          <div className='mt-3'>
            <Select
              isMulti
              options={data}
              value={selectedOptions}
              onChange={handleSelectChange}
            />
          </div>
          <div className='mt-4'>
            <input
            className=' text-white' 
            type="file"
            name='file'
            accept='.pdf, .ppt, .doc, .txt' 
            placeholder='Upload file'
            onChange={(e)=> setFile(e.target.files[0])}
            />
          </div>
        
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5" type='submit'> Add</button>
        </div>
      </form>
    </div>
  )
}

export default Addnote