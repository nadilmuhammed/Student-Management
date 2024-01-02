// import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import { errorToast,successToast } from '../Toastify/Toast';
import { Link } from 'react-router-dom';
import { errorToast } from '../../../Toastify/Toast';
import axios from 'axios';

export default function App() {

    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/api/intern/getassignment/${localStorage.getItem("id")}`);
          setData(response.data);
          // console.log(response.data.map((items)=>{
          //   console.log(items) 
          // }),"dfja ");
        } catch (error) {
          errorToast(error.message);
        }
      };


        useEffect(()=>{
        fetchData();
      },[refresh]);

    
  return (
    <>
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8"> 
        <p className='viewformheading'>Intern Details</p>   
          <div className="overflow-hidden viewAllform">
          <Link to="/admin/addIntern"><button style={{background:"#2891BB",color:"white",width:"5rem",padding:"10px"}}>Add</button></Link>
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr style={{textAlign:"center"}}>
                  <th scope="col" className="px-6 py-4">#</th>
                  <th scope="col" className="px-6 py-4">Topic</th>
                  <th scope="col" className="px-6 py-4">Question</th>
                  <th scope="col" className="px-6 py-4">Due Date</th>
                  <th scope="col" className="px-6 py-4">Upload work</th>
                </tr>
              </thead>
              <tbody style={{textAlign:"center"}}>
                {data.map((user,index)=>{
                  console.log(user,"fbahfb");
                    return(
                        <>
                            <tr className="border-b dark:border-neutral-500" key={index}>
                            <td className="whitespace-nowrap px-6 py-4 font-medium">{index+1}</td>
                            <td className="whitespace-nowrap px-6 py-4">{user.name}</td>
                            <td className="whitespace-nowrap px-6 py-4">{user.description}</td>
                            <td className="whitespace-nowrap px-6 py-4">{new Date(user.validto).getDay()}-{new Date(user.validto).getMonth()}-{new Date(user.validto).getFullYear()}</td>
                            <div className='whitespace-nowrap px-6 py-4 buttonspace' style={{display:"flex",justifyContent:"space-around"}}>
                                <Link to={`/intern/assignmentall/${user._id}`}>
                                  <button DataOne={user} style={{background:"#BB3628",color:"white",width:"5rem",padding:"10px"}}>Add work</button>
                                </Link>
                            </div>
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
    </>
  );
}