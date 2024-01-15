import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { errorToast,successToast } from '../Toastify/Toast';
import { Link } from 'react-router-dom';

export default function App() {

    const [data, setData] = useState([]);
    const [status, setStatus] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [ search,setSearch ] = useState('');
    const [ searchBatch,setSearchBatch ] = useState('');


    const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:4000/api/admin/adminintern");
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
        
    <div className="flex flex-col h-96">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8"> 
        <p className='text-center text-4xl font-bold'>Intern Details</p>   
          <div className="overflow-hidden">
            <div className=' flex lg:flex-row md:flex-col max-sm:flex-col gap-3 mt-3'>
              <div>
              <Link to="/admin/addIntern">
                <button className='bg-blue-500 text-white p-2 w-20 rounded'>Add</button>
              </Link>
              </div>
              <div>
                <input
                 className='rounded border-none shadow-[0_0px_8px_3px_rgba(0,0,0,0.3)]'
                 type="search" 
                 placeholder='Search Interns....'
                 onChange={(e)=> setSearch(e.target.value)}
                  />
              </div>
              <div>
                <input
                 className='rounded border-none shadow-[0_0px_8px_3px_rgba(0,0,0,0.3)]'
                 type="search" 
                 placeholder='Search by batch....'
                 onChange={(e)=> setSearchBatch(e.target.value)}
                  />
              </div>
            </div>
            <table className="min-w-full text-left text-sm font-light mt-3">
              <thead className="border-b font-medium dark:border-neutral-500 bg-slate-700 text-white">
                <tr style={{textAlign:"center"}}>
                  <th scope="col" className="px-6 py-4">#</th>
                  <th scope="col" className="px-6 py-4">Name</th>
                  <th scope="col" className="px-6 py-4">Email</th>
                  <th scope="col" className="px-6 py-4">password</th>
                  <th scope="col" className="px-6 py-4">Image</th>
                  <th scope="col" className="px-6 py-4">Traine</th>
                  <th scope="col" className="px-6 py-4">Batch</th>
                  <th scope="col" className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody style={{textAlign:"center"}}>
                {data.filter((items)=>{
                  return search.toLowerCase() === '' ? items : items.name.toLowerCase().includes(search)
                })
                .filter((batchitems)=>{
                  return searchBatch.toLowerCase() === '' ? batchitems : batchitems.batchData.batch.toLowerCase().includes(searchBatch)
                })
                .map((user,index)=>{
                    return(
                        <>
                            <tr className="border-b dark:border-neutral-500" key={index}>
                            <td className="whitespace-nowrap px-6 py-4 font-medium">{index+1}</td>
                            <td className="whitespace-nowrap px-6 py-4">{user.name}</td>
                            <td className="whitespace-nowrap px-6 py-4">{user.email}</td>
                            <td className="whitespace-nowrap px-6 py-4">{user.password}</td>
                            <td style={{width:"10%"}} className="whitespace-nowrap px-6 py-4">
                              <img style={{borderRadius:"2rem"}} src={`http://localhost:4000/uploads/${user.image}`} alt="no image" />
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">{user.trainerData.name}</td>
                            <td className="whitespace-nowrap px-6 py-4">{user.batchData.batch}</td>
                            <div className='whitespace-nowrap px-6 py-4 buttonspace' style={{display:"flex",justifyContent:"space-around",gap:"1rem"}}>
                                <button className='bg-red-800 text-white p-2 w-20 rounded' onClick={()=>handleDelete(user._id)}>Delete</button>
                                <Link to={`/admin/updateintern/${user._id}`}>
                                  <button className='bg-blue-600 text-white p-2 w-20 rounded'>Edit</button>
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
    )}
    </>
  );
}