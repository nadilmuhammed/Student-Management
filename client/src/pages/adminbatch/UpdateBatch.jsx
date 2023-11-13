import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { TEInput, TERipple } from "tw-elements-react";

export default function RegisterForm() {
    const [batch, setBatch] = useState('');

    const {id} = useParams();
    const onSubmitAll = async(e) => {
      e.preventDefault();
    try {
      const response  = await axios.put(`http://localhost:4000/api/admin/updatebatch/${id}`,{
          batch:batch
      })
      console.log(response.data,'lll');
      console.log(response.data.result);
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
    }

  };




    const fetchData= async(id)=>{
        try {
            let response = await axios.get(`http://localhost:4000/api/admin/getbatchID/${id}`);
            
            console.log(setName,'nsnfknsd');
            setBatch(response.data.batch);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(()=>{
        fetchData(id);
    },[])





  return (
    <div className="block max-w-sm rounded-lg bg-dark p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] white:bg-neutral-700"
       style={{margin:"0% 30% 0% 30%"}}>
        <p style={{textAlign:"center",fontSize:"25px",fontWeight:"bold"}}>Update Batch</p>
      <form className="mt-3"  onSubmit={onSubmitAll}>

        {/* <!--Batch input--> */}
        <TEInput
          type="text"
          label="batch"
          value={batch}
          onChange={(e)=>setBatch(e.target.value)}
          className="mb-6"
        ></TEInput>

        {/* <!--Submit button--> */}
        <TERipple rippleColor="light" className="w-full" style={{display:"flex",justifyContent:"space-around"}}>
          <button
            type="submit"
            className="block w-20% rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]]"
          >
            Update
          </button>
          <button
            type="submit"
            className="block w-20% rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]]"
          >
            <Link to="/admin/viewbatches">
              batches
            </Link>
          </button>
        </TERipple>
      </form>
    </div>
  );
}