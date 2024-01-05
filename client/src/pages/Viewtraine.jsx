import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Addtrainee from "../pages/Addtrainee"
import { errorToast,successToast } from '../Toastify/Toast';
import { Link } from 'react-router-dom';

export default function App() {

    const [data, setData] = useState([]);
    const [status, setStatus] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [ search,setSearch ] = useState('');

    const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:4000/api/admin/admintraine");
          setData(response.data);
        } catch (error) {
          errorToast(error.message);
        }
      };



      const handleDelete = async (id) => {
        try {
          // const response = await axios.delete(`http://localhost:4000/api/admin/deletetraine/${id}`,{headers:{
          //   'Authorization': `Bearer ${localStorage.getItem('token')}` ,
          //   'Content-Type': 'application/json',
          // }});
          const response = await axios.delete(`http://localhost:4000/api/admin/deletetraine/${id}`);
          successToast('Deleted.')
          setRefresh(!refresh)
        } catch (error) {
          console.log('err',error);
          errorToast(error.response.data.message);
        }
      };

      useEffect(()=>{
        fetchData();
      },[refresh]);

console.log(data);


  return (
    <>
    {status ? (
        <>
        <Addtrainee setRefresh={setRefresh} refresh={refresh} />
        </>        
    ): (
        
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
        <p className='viewformheading'>Traine Details</p> 
        {/* md:bg-red-700 md:my-10 md:mx-32 lg:my-0 lg:mx-0 */}
          <div className="overflow-hidden viewAllform">
            <div className='flex lg:flex-row md:flex-col max-sm:flex-col  gap-3'>
              <div>
                <Link to="/admin/addtrainee"><button style={{background:"#2891BB",color:"white",width:"5rem",padding:"10px"}}>+ Add</button></Link>
              </div>
              <div>
                <input
                 className='rounded border-none shadow-[0_0px_8px_3px_rgba(0,0,0,0.3)]'
                 type="search" 
                 placeholder='Search here....'
                 onChange={(e)=> setSearch(e.target.value)}
                  />
              </div>
            </div>
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr style={{textAlign:"center"}}>
                  <th scope="col" className="px-6 py-4">#</th>
                  <th scope="col" className="px-6 py-4">Name</th>
                  <th scope="col" className="px-6 py-4">Email</th>
                  <th scope="col" className="px-6 py-4">Username</th>
                  <th scope="col" className="px-6 py-4">Password</th>
                  <th scope="col" className="px-6 py-4">Image</th>
                  <th scope="col" className="px-6 py-4">ID</th>
                </tr>
              </thead>
              <tbody style={{textAlign:"center"}}>
                {data.filter((items)=>{
                  return search.toLowerCase() === '' ? items : items.name.toLowerCase().includes(search)
                })
                .map((user,index)=>{
                  console.log(user);
                    return(
                        <>

                            <tr style={{textAlign:"center"}} className="border-b dark:border-neutral-500" key={index}>
                            <td className="whitespace-nowrap px-6 py-4 font-medium">{index+1}</td>
                            <td className="whitespace-nowrap px-6 py-4">{user.name}</td>
                            <td className="whitespace-nowrap px-6 py-4">{user.email}</td>
                            <td className="whitespace-nowrap px-6 py-4">{user.username}</td>
                            <td className="whitespace-nowrap px-6 py-4">{user.password}</td>
                            <td style={{width:"10%"}} className="whitespace-nowrap px-6 py-4">
                              <img style={{borderRadius:"2rem"}} src={`http://localhost:4000/uploads/${user.image}`} alt="no image"/>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">{user.id_no}</td>
                            <div className='whitespace-nowrap px-6 py-4 buttonspace'>
                                <button style={{background:"#BB3628",color:"white",width:"5rem",padding:"10px"}} onClick={()=>handleDelete(user._id)}>Delete</button>
                                <button style={{background:"#2891BB",color:"white",width:"5rem",padding:"10px"}}><Link to={`/admin/update/${user._id}`}>Edit</Link></button>
                                
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