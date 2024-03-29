import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { errorToast, successToast } from '../../Toastify/Toast';

export default function App() {

    const [data, setData] = useState([]);
    const [status, setStatus] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [ search,setSearch ] = useState('');

    const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:4000/api/admin/getbatch");
          setData(response.data);
          console.log(response.data);
        } catch (error) {
          errorToast(error.message);
        }
      };



      const handleDelete = async (id) => {
        try {
          const response = await axios.delete(`http://localhost:4000/api/admin/deletebatch/${id}`);
          successToast('Deleted.')
          setRefresh(!refresh)
        } catch (error) {
          errorToast(error.response.data.message);
        }
      };

      useEffect(()=>{
        fetchData();
      },[refresh]);




  return (
    <>
    {status ? (
        <>
        <AddBatch setRefresh={setRefresh} refresh={refresh} />
        </>        
    ): (
        
    <div className="flex flex-col max-h-96">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <p className='viewformheading'>Batch Details</p>  
          <div className="overflow-hidden viewAllform">
            <div className='flex lg:flex-row md:flex-col max-sm:flex-col  gap-3'>
              <Link to="/admin/batches">
                <button style={{background:"#2891BB",color:"white",width:"5rem",padding:"10px"}}>Add</button>
              </Link>
              <div>
                <input type="search"
                placeholder='Search by batch.....' 
                className='rounded border-none shadow-[0_0px_8px_3px_rgba(0,0,0,0.3)]'
                onChange={(e)=> setSearch(e.target.value)}/>
              </div>
            </div>

            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr style={{textAlign:"center"}}>
                  <th scope="col" className="px-6 py-4">#</th>
                  <th scope="col" className="px-6 py-4">Batch</th>
                  <th scope="col" className="px-6 py-4">Traine</th>
                </tr>
              </thead>
              <tbody>
                {data.filter((items)=>{
                  return search.toLowerCase() === '' ? items : items.batch.toLowerCase().includes(search)
                })
                .map((user,index)=>{
                    return(
                        <>

                            <tr style={{textAlign:"center"}} className="border-b dark:border-neutral-500" key={index}>
                            <td className="whitespace-nowrap px-6 py-4 font-medium">{index+1}</td>
                            <td className="whitespace-nowrap px-6 py-4">{user.batch}</td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <ul>
                                {
                                  user.trainernewData.map((items)=>{
                                    console.log(items,"items");
                                    return(
                                      <li>{items.name}</li>
                                    )
                                  })
                                }
                              </ul>
                            </td>
                            <td className='whitespace-nowrap px-6 py-4' style={{display:"flex",justifyContent:"space-around"}}>
                                <button style={{background:"#BB3628",color:"white",width:"5rem",padding:"10px"}} onClick={()=>handleDelete(user._id)}>Delete</button>
                                <Link to={`/admin/updatebatch/${user._id}`}><button style={{background:"#2891BB",color:"white",width:"5rem",padding:"10px"}}>Edit</button></Link>
                                {/* <button style={{background:"#2891BB",color:"white",width:"5rem",padding:"10px"}}>Edit</button> */}
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