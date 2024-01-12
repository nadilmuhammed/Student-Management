import React, { useEffect, useState } from 'react';
import DoughnutChart from '../../charts/DoughnutChart';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';
import { errorToast } from '../../Toastify/Toast';
import axios from 'axios';

function DashboardCard06() {

  const [ batch,setBatch ] = useState([]);
  // const [ internData,setInterndata ] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/admin/getbatch");
      console.log(response.data,"fdnjdfnj");
      setBatch(response.data);
    } catch (error) {
      errorToast(error.message);
    }
  };

  // const fetchInternData = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:4000/api/admin/adminintern");
  //     console.log(response.data,"datasss");
  //     setInterndata(response.data);
  //   } catch (error) {
  //     errorToast(error.message);
  //   }
  // };

  

  useEffect(()=>{
    fetchData();
    // fetchInternData();
  },[])

  const labels = batch.map((items)=> items.batch) ;
  console.log(labels,"label");
  const data = batch.map((items)=> items.trainerData.name.length );
  console.log(data,"dduh");
  // const generateChartData = () =>{

  //   return {
      // labels,
  //     datasets: [
  //       {
  //         label:'batch data', 
  //         // data,
  //         backgroundColor: [
  //           tailwindConfig().theme.colors.indigo[500],
  //           tailwindConfig().theme.colors.blue[400],
  //           tailwindConfig().theme.colors.indigo[800],
  //         ],
  //         hoverBackgroundColor: [
  //           tailwindConfig().theme.colors.indigo[600],
  //           tailwindConfig().theme.colors.blue[500],
  //           tailwindConfig().theme.colors.indigo[900],
  //         ],
  //         borderWidth: 0,
  //       },
  //     ],
  //   }
  // }

  // const chartData = generateChartData();   

 console.log(batch,'batch');
  const chartData = {

    // labels: ['United States', 'Italy', 'Other'],
    labels,

    datasets: [
      {
        label: "Trainers",
        // data,
         data: [
           90, 30, 35,
        ],
        backgroundColor: [
          tailwindConfig().theme.colors.indigo[500],
          tailwindConfig().theme.colors.blue[400],
          tailwindConfig().theme.colors.indigo[800],
        ],
        hoverBackgroundColor: [
          tailwindConfig().theme.colors.indigo[600],
          tailwindConfig().theme.colors.blue[500],
          tailwindConfig().theme.colors.indigo[900],
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Batches</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      {batch.length > 0 ? (
        <DoughnutChart data={chartData} width={389} height={260} />
      ):(
        <p>Loading....</p>
      )}
    </div>
  );
}

export default DashboardCard06;
