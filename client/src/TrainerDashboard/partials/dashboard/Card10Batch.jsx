import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { errorToast } from '../../../Toastify/Toast';

function Card10Batch() {

  const [ data,setData ] = useState([])
  const [ refresh,setRefresh ] = useState(false);

  const fetchBatchData = async () => {
    
    try {
      const response = await axios.get(`http://localhost:4000/api/trainer/getbatchtrainerID/${localStorage.getItem("id")}`);
        setData(response.data);
    } catch (error) {
      errorToast(error.message);
    }
  };

  useEffect(()=>{
    fetchBatchData()
  },[])


  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Batch Details</h2>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50">
              <tr>
              <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Interns</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
              {
                data.map((items) => {
                    console.log(items,"interns");
                  return (
                    <tr key={items.id}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="font-medium text-slate-800 dark:text-slate-100">{items.name}</div>
                      </td>
                        <div className="text-left">{items.internData.map((items)=>{
                            console.log(items,"ns cmn");
                            return(
                                <td className="p-2 whitespace-nowrap">{items.name}</td>
                            )
                            
                        })}</div>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

        </div>

      </div>
    </div>
  );
}

export default Card10Batch;
