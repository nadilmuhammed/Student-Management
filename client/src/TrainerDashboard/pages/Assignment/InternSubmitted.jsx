import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import View from "./View"
// import { errorToast, successToast } from '../../../Toastify/Toast';
// import axios from 'axios';



export default function App({refresh,setRefresh}) {

  // const [data, setData] = useState([]);
  const [status, setStatus] = useState(false);
  // const [refresh, setRefresh] = useState(false);

  // const fetchData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:4000/api/trainer/getassignment");
  //       setData(response.data);
  //       console.log(response.data,"data");
  //     } catch (error) {
  //       errorToast(error.message);
  //     }
  //   };




  //   useEffect(()=>{
  //     fetchData();
  //   },[refresh]);


  return (
    <>
    {status ? (
        <>
        <View setRefresh={setRefresh} refresh={refresh} />
        </>        
    ): (
        
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8 "> 
        <p className='viewformheading'>Submitted Details</p>   
          <div className="overflow-hidden viewAllform">
          {/* <Link to="/trainer/addassignment"><button style={{background:"#2891BB",color:"white",width:"5rem",padding:"10px"}}>Add</button></Link> */}
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr className='text-center'>
                  <th scope="col" className="px-6 py-4">#</th>
                  <th scope="col" className="px-6 py-4">Name</th>
                  <th scope="col" className="px-6 py-4">Topic</th>
                  <th scope="col" className="px-6 py-4">Submition Date</th>
                  <th scope="col" className="px-6 py-4">Submitted Date</th>
                  <th scope="col" className="px-6 py-4">Assignment</th>
                
                </tr>
              </thead>
              {/* <tbody style={{textAlign:"center"}}>
                {data.map((user,index)=>{
                  console.log(user,"jnsdjsdn");
                    return(
                        <>
                            <tr className="border-b dark:border-neutral-500" key={index}>
                            <td className="whitespace-nowrap px-6 py-4 font-medium">{index+1}</td>
                            <td className="whitespace-nowrap px-6 py-4">{user.name}</td>
                            <td className="whitespace-nowrap px-6 py-4">{user.description}</td>
                            <td className="whitespace-nowrap px-6 py-4">{user.internData.name}</td>
                            <td className="whitespace-nowrap px-6 py-4">{ new Date(user.validfrom ).getDay()}-{new Date(user.validfrom ).getMonth()}-{new Date(user.validfrom ).getFullYear()}</td>
                            <td className="whitespace-nowrap px-6 py-4">{new Date(user.validto).getDay()}-{new Date(user.validto).getMonth()}-{new Date(user.validto).getFullYear()}</td>
                            <div className='whitespace-nowrap px-6 py-4 buttonspace' style={{display:"flex",justifyContent:"space-around",gap:"2rem"}}>
                                <button style={{background:"#BB3628",color:"white",width:"5rem",padding:"10px"}} onClick={()=>handleDelete(user._id)}>Approve</button>
                                <Link to={`/trainer/updateassignment/${user._id}`}><button style={{background:"#2891BB",color:"white",width:"5rem",padding:"10px"}}>Reject</button></Link>
                            </div>
                            </tr>
                        </>
                    )
                })}
              </tbody> */}
            </table>
          </div>
        </div>
      </div>
    </div>
    )}
    </>
  );
}