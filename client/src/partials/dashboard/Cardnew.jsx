import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

export default function BasicPie() {

  const [ batch,setBatch ] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/admin/getbatch");
      console.log(response.data,"fdnjdfnj");
      setBatch(response.data);
    } catch (error) {
      errorToast(error.message);
    }
  };

  useEffect(()=>{
    fetchData();
  },[])

  const transformBatchData = () => {
      // Transform the batch data to the format expected by PieChart
      return batch.map((batchItem, index) => (
        {
      id: index,
      value: 1,
      label: batchItem.batch,
    }));
  };



  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-5 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Batches</h2>
      </header>
      <PieChart
      series={[
        {
        //   data: [
        //     { id: 0, value: 10, label: 'series A' },
        //     { id: 1, value: 15, label: 'series B' },
        //     { id: 2, value: 20, label: 'series C' },
        //   ],
        data: transformBatchData(),
        },
      ]}
      width={400}
      height={200}/>
    </div>
  );
}
