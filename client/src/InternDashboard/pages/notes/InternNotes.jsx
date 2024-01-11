
import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { errorToast, successToast } from '../../../Toastify/Toast';
import axios from 'axios';
import { MdDelete } from 'react-icons/md';
import { FaDownload, FaEdit } from 'react-icons/fa';



export default function App() {

  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/intern/getallNotes/${localStorage.getItem("id")}`);
        console.log(response.data,"response");
          
        setData(response.data);
      } catch (error) {
        errorToast(error.response.data.message);
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
        <p className='viewformheading'>Notes</p>   
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light mt-3">
              <thead className="border-b font-medium dark:border-neutral-500 bg-slate-700 text-white ">
                <tr className='text-center'>
                  <th scope="col" className="px-6 py-4">#</th>
                  <th scope="col" className="px-6 py-4">Name</th>
                  <th scope="col" className="px-6 py-4">Topics</th>
                  <th scope="col" className="px-6 py-4">Download File</th>
                </tr>
              </thead>
              <tbody style={{textAlign:"center"}}>
                {data.map((user,index)=>{
                    return(
                        <>
                            <tr className="border-b dark:border-neutral-500" key={index}>
                            <td className="whitespace-nowrap px-6 py-4 font-medium">{index+1}</td>
                            <td className="whitespace-nowrap px-6 py-4">{user.name}</td>
                            <td style={{maxWidth:"200px",overflow:"scroll"}} className="whitespace-nowrap px-6 py-4">{user.description}</td>
                            <td className="whitespace-nowrap px-6 py-4">
                                <Link to={`http://localhost:4000/trainernotes/${user.file}`} download=''>
                                    <button className='p-2 bg-gray-700 rounded'><FaDownload className='text-xl text-white'/></button>
                                </Link>
                                    {/* {`http://localhost:4000/trainernotes/${user.file}`} */}
                            </td>

                            </tr>
                        </>
                    )
                })}
                {/* {JSON.stringify(data)} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}