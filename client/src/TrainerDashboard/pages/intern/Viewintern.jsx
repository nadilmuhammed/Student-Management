import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { errorToast, successToast } from '../../../Toastify/Toast';

export default function App() {

    const [data, setData] = useState([]);
    const [status, setStatus] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/api/trainer/getinternoftrainer/${localStorage.getItem('id')}`);
          setData(response.data);
          console.log(response.data);
        } catch (error) {
          errorToast(error.message);
        }
      };



      const handleDelete = async (id) => {
        try {
          const response = await axios.delete(`http://localhost:4000/api/admin/deleteintern/${id}`,{headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}` ,
            'Content-Type': 'application/json',
          }});
          successToast('Deleted.')
          setRefresh(!refresh)
        } catch (error) {
          errorToast(error.message);
        }
      };

      useEffect(()=>{
        fetchData();
      },[refresh]);




  return (
    <>
    {status ? (
        <>
        <AddIntern setRefresh={setRefresh} refresh={refresh} />
        </>        
    ): (
        
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
                  <th scope="col" className="px-6 py-4">Name</th>
                  <th scope="col" className="px-6 py-4">Email</th>
                  <th scope="col" className="px-6 py-4">Image</th>
                </tr>
              </thead>
              <tbody style={{textAlign:"center"}}>
                {data.map((user,index)=>{
                  console.log(user,"jnsdjsdn");
                    return(
                        <>
                            <tr className="border-b dark:border-neutral-500" key={index}>
                            <td className="whitespace-nowrap px-6 py-4 font-medium">{index+1}</td>
                            <td className="whitespace-nowrap px-6 py-4">{user.name}</td>
                            <td className="whitespace-nowrap px-6 py-4">{user.email}</td>
                            <td style={{width:"10%"}} className="whitespace-nowrap px-6 py-4">
                              <img style={{borderRadius:"2rem"}} src={`http://localhost:4000/uploads/${user.image}`} alt="no image" />
                            </td>
                            <div className='whitespace-nowrap px-6 py-4 buttonspace' style={{display:"flex",justifyContent:"space-around"}}>
                                <button style={{background:"#BB3628",color:"white",width:"5rem",padding:"10px"}} onClick={()=>handleDelete(user._id)}>Delete</button>
                                <Link to={`/trainer/updateintern/${user._id}`}><button style={{background:"#2891BB",color:"white",width:"5rem",padding:"10px"}}>Edit</button></Link>
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
    )}
    </>
  );
}