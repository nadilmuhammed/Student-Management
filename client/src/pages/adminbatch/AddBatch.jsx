import React, { useState } from "react";
import { TEInput, TERipple } from "tw-elements-react";
import { errorToast, successToast } from "../../Toastify/Toast";
import axios from "axios";

export default function BasicExample({setRefresh,refresh}){

  const [batch, setBatch] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post(`http://localhost:4000/api/admin/createBatch`,{
          batch:batch,
        });
        console.log(response.data,"response");
        if(response.data.result){
          successToast('Created.')
          setRefresh(!refresh)
        }
      } catch (error) {
        errorToast(error.response.data.message);
        // console.log(error.message);
      }
  };
  return (
    <div className="block max-w-sm rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <form onSubmit={handleSubmit}>
        <p>Add Batches</p>
        {/* <!--E-mail input--> */}
        <TEInput
          type="text"
          label="Batches"
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
        >
        </TEInput>
        

        {/* <!--Submit button--> */}
        <TERipple rippleColor="light" className="mt-6">
          <button
            type="submit"
            className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Submit
          </button>
        </TERipple>
      </form>
    </div>
  );
}