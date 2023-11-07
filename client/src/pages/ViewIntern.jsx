import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { errorToast,successToast } from '../Toastify/Toast';
import { Link } from 'react-router-dom';

export default function App() {

    const [data, setData] = useState([]);
    const [status, setStatus] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:4000/api/admin/adminintern");
    
          setData(response.data);
        } catch (error) {
          errorToast(error.message);
        }
      };



      const handleDelete = async (id) => {
        try {
          const response = await axios.delete(`http://localhost:4000/api/admin/deleteintern/${id}`);
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
          <div className="overflow-hidden" style={{margin:"0% 10% 0% 10%"}}>
          <Link to="/admin/addIntern"><button style={{background:"#2891BB",color:"white",width:"5rem",padding:"10px"}}>Add</button></Link>
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">#</th>
                  <th scope="col" className="px-6 py-4">Name</th>
                  <th scope="col" className="px-6 py-4">Email</th>
                  <th scope="col" className="px-6 py-4">Traine</th>
                  <th scope="col" className="px-6 py-4">Batch</th>
                </tr>
              </thead>
              <tbody>
                {data.map((user,index)=>{
                    return(
                        <>

                            <tr className="border-b dark:border-neutral-500" key={index}>
                            <td className="whitespace-nowrap px-6 py-4 font-medium">{index+1}</td>
                            <td className="whitespace-nowrap px-6 py-4">{user.name}</td>
                            <td className="whitespace-nowrap px-6 py-4">{user.email}</td>
                            <td className="whitespace-nowrap px-6 py-4">{user.traine}</td>
                            <td className="whitespace-nowrap px-6 py-4">{user.batch}</td>
                            <div className='whitespace-nowrap px-6 py-4' style={{display:"flex",justifyContent:"space-around"}}>
                                <button style={{background:"#BB3628",color:"white",width:"5rem",padding:"10px"}} onClick={()=>handleDelete(user._id)}>Delete</button>
                                <Link to={`/admin/updateintern/${user._id}`}><button style={{background:"#2891BB",color:"white",width:"5rem",padding:"10px"}}>Edit</button></Link>
                                {/* <button style={{background:"#2891BB",color:"white",width:"5rem",padding:"10px"}}>Edit</button> */}
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