import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import View from "./View"
import axios from 'axios';
import { errorToast } from '../../../Toastify/Toast';
import { FaDownload } from 'react-icons/fa';



export default function App({refresh,setRefresh}) {

  const [data, setData] = useState([]);
  const [status, setStatus] = useState(false);
  // const [refresh, setRefresh] = useState(false);

  const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/trainer/getinterndata");
        setData(response.data);
        console.log(response.data,"data");
      } catch (error) {
        errorToast(error.message);
      }
    };


    const handleApprove = async(id) =>{
      console.log(id,"dfjnjdf");
      try {
        let response = await axios.put(`http://localhost:4000/api/trainer/approvedata/${id}`);
        console.log(response.data);
        fetchData();
      } catch (error) {
        errorToast(error.response.data.message);
      }
    }

    const handleReject = async(id) =>{
      try {
        let response = await axios.put(`http://localhost:4000/api/trainer/rejectdata/${id}`);
        console.log(response.data);
        fetchData();
      } catch (error) {
        errorToast(error.response.data.message);
      }
    }


    useEffect(()=>{
      fetchData();
    },[refresh]);


    


  return (
    <>
    {status ? (
        <>
        <View setRefresh={setRefresh} refresh={refresh} />
        </>        
    ): (
        
    <div className="flex flex-col overflow-hidden max-h-96">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8 "> 
        <p className='viewformheading'>Intern Submitted Details</p>   
          <div className="overflow-hidden viewAllform p-0">
          {/* <Link to="/trainer/addassignment"><button style={{background:"#2891BB",color:"white",width:"5rem",padding:"10px"}}>Add</button></Link> */}
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500 bg-slate-700 text-white ">
                <tr className='text-center'>
                  <th scope="col" className="px-6 py-4">#</th>
                  <th scope="col" className="px-6 py-4">Intern</th>
                  <th scope="col" className="px-6 py-4">Topic</th>
                  <th scope="col" className="px-6 py-4">Description</th>
                  <th scope="col" className="px-6 py-4">InternStatus</th>
                  <th scope="col" className="px-6 py-4">From</th>
                  <th scope="col" className="px-6 py-4">Due Date</th>
                  <th scope="col" className="px-6 py-4">file</th>
                  <th scope="col" className="px-6 py-4"></th>
                
                </tr>
              </thead>
              <tbody style={{textAlign:"center"}}>
                {data.map((user,index)=>{
                  console.log(user,"jnsdjsdn");
                    return(
                        <>
                            <tr className="border-b dark:border-neutral-500" key={index}>
                            <td className="whitespace-nowrap px-6 py-4 font-medium">{index+1}</td>
                            <td className="whitespace-nowrap px-6 py-4">{user?.StudentName}</td>
                            <td className="whitespace-nowrap px-6 py-4">{user?.AssignmentData?.name}</td>
                            <td className="whitespace-nowrap px-6 py-4">{user?.AssignmentData?.description}</td>
                            <td className="whitespace-nowrap px-6 py-4">{user?.statusOfSubmit}</td>
                            <td className="whitespace-nowrap px-6 py-4">{ new Date(user.AssignmentData.validfrom ).getDay()}-{new Date(user.AssignmentData.validfrom ).getMonth()}-{new Date(user?.AssignmentData.validfrom ).getFullYear()}</td>
                            <td className="whitespace-nowrap px-6 py-4">{new Date(user?.AssignmentData.validto).getDay()}-{new Date(user?.AssignmentData.validto).getMonth()}-{new Date(user?.AssignmentData.validto).getFullYear()}</td>
                            <td className="whitespace-nowrap px-6 py-4">
                            <Link to={`http://localhost:4000/internfiles/${user.file}`}  download=''>
                              <button><FaDownload /></button>
                            </Link>
                            </td>
                            <td className="">
                              <div className='whitespace-nowrap px-6 py-4 buttonspace' style={{display:"flex",justifyContent:"space-around",gap:"2rem"}}>
                                <div>
                                  <button className='bg-red-700 text-white p-2 rounded' onClick={()=>handleApprove(user._id)}>Approve</button>
                                </div>
                                <div>
                                  <button className='bg-blue-600 text-white p-2 rounded' onClick={()=> handleReject(user._id)}>Reject</button>
                                </div>
                              </div>
                            </td>

                            </tr>
                        </>
                    )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    )}
    </>
  );
}