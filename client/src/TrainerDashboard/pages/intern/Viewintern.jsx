import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { errorToast, successToast } from '../../../Toastify/Toast';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import Search from './Search';

export default function App() {

    const [data, setData] = useState([]);
    const [status, setStatus] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [ search,setSearch ] = useState('');

    const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/api/trainer/getinternoftrainer/${localStorage.getItem('id')}`);
          
          setData(response.data);
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
        <AddIntern setRefresh={setRefresh} refresh={refresh} />
        </>        
    ): (
        
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8"> 
        <p className='viewformheading'>Intern Details</p>   
          <div className="overflow-hidden viewAllform">
            <div className='flex gap-3'>
              <Link to="/trainer/addIntern">
                <button style={{background:"#2891BB",color:"white",width:"5rem",padding:"10px",borderRadius:"10px"}}>Add</button>
              </Link>
              <div className=''>
                {/* <input className='rounded' type="search" placeholder='search by name....'/> */}
                <Search search={search} setSearch={setSearch}/>
              </div>
            </div>
            <table className="min-w-full text-left text-sm font-light mt-4">
              <thead className="border-b font-medium dark:border-neutral-500 bg-slate-700 text-white">
                <tr style={{textAlign:"center"}}>
                  <th scope="col" className="px-6 py-4">#</th>
                  <th scope="col" className="px-6 py-4">Name</th>
                  <th scope="col" className="px-6 py-4">Email</th>
                  <th scope="col" className="px-6 py-4">Password</th>
                  <th scope="col" className="px-6 py-4">Image</th>
                  <th scope="col" className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody style={{textAlign:"center"}}>
                {data.filter((items)=>{
                  return search.toLowerCase() === '' ? items : items.name.toLowerCase().includes(search)
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
                            <div className='whitespace-nowrap px-6 py-4 buttonspace' style={{display:"flex",justifyContent:"space-around"}}>
                                <button className='rounded' style={{background:"#BB3628",color:"white",padding:"10px"}} onClick={()=>handleDelete(user._id)}>
                                <MdDelete className='text-xl' />
                                </button>
                                <Link to={`/trainer/updateintern/${user._id}`}>
                                  <button className='rounded' style={{background:"black",color:"white",padding:"10px"}}>
                                  <FaEdit className='text-xl flex justify-center items-center' />
                                  </button>
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