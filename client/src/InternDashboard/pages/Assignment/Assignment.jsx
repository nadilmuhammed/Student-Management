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
          console.log(response.data,"ddatatat");
          setData(response.data);
        } catch (error) {
          errorToast(error.message);
        }
      };


        useEffect(()=>{
        fetchData();
      },[refresh]);

      // const likePost = async(id)=>{
      //   try {
      //     const userid = localStorage.getItem("id");

      //     if(!userid){
      //       console.error('userid is not found');
      //       return
      //     }

      //     const response = await axios.post('http://localhost:4000/api/intern/like',{ userid,id })

      //   } catch (error) {
      //     errorToast(error.message);
      //   }
      // }

    
  return (
    <>
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8"> 
        <p className='flex justify-center p-2 font-bold text-4xl '>Assignment</p>   
          <div className="overflow-hidden viewAllform p-0">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500 bg-slate-700 text-white">
                <tr style={{textAlign:"center"}}>
                  <th scope="col" className="px-6 py-4">#</th>
                  <th scope="col" className="px-6 py-4">Topic</th>
                  <th scope="col" className="px-6 py-4">Question</th>
                  <th scope="col" className="px-6 py-4">Due Date</th>
                  <th scope="col" className="px-6 py-4">Status of work</th>
                  <th scope="col" className="px-6 py-4"></th>
                  <th scope="col" className="px-6 py-4"></th>
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
                            <td className="whitespace-nowrap px-6 py-4">{new Date(user.validto).getDay()}-{new Date(user.validto).getMonth() + 1}-{new Date(user.validto).getFullYear()}</td>
                            <div className='whitespace-nowrap px-6 py-4 buttonspace' style={{display:"flex",justifyContent:"space-around"}}>
                               {!(user.answer?.statusOfSubmit[0]) && <Link to={`/intern/assignmentall/${user._id}`}>
                                  <button className='rounded' DataOne={user} style={{background:"#BB3628",color:"white",width:"5rem",padding:"10px"}}>Add work</button>
                                </Link>}
                                {user.answer?.statusOfSubmit[0]}
                                {console.log(user.answer?.statusOfSubmit[0],'aaa')}
                            </div>
                                  <td className="whitespace-nowrap px-6 py-4">{!(user.answer?.statusOfSubmit[0]) && user.statusOfSubmit}</td>
                           
                            <td className="whitespace-nowrap px-6 py-4">
                              <button 
                              onClick={() => likePost(user._id)}>like</button>
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
    </>
  );
}