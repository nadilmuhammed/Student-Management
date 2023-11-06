import axios from "axios";
import React, { useState } from "react";
import { errorToast,successToast } from "../Toastify/Toast";
import { TEInput, TERipple } from "tw-elements-react";


export default function BasicExample({setRefresh,refresh}) {


  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [batch, setBatch] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post(`http://localhost:4000/api/admin/createtraine`,{
          name:name,
          email:email,
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
    <div className="block max-w-sm rounded-lg bg-dark p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] white:bg-neutral-700" style={{alignItems:"center",margin:"0% 30% 0% 30%"}}>
      <form onSubmit={handleSubmit}>
        {/* <!--E-mail input--> */}
        <p style={{textAlign:"center",fontSize:"25px",fontWeight:"bold"}}>Add Traine</p>
        <TEInput
          type="text"
          label="Name"
          className="mt-12 mb-6"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        ></TEInput>
        <TEInput
          type="email"
          label="Email address"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        >
          <small
            id="emailHelp"
            className="absolute w-full text-neutral-500 dark:text-neutral-200"
          >
            We'll never share your email with anyone else.
          </small>
        </TEInput>
        <TEInput
          type="text"
          label="Batch"
          className="mt-12 mb-6"
          value={batch}
          onChange={(e)=>setBatch(e.target.value)}
        ></TEInput>
         {/* <div>
            <h2>Batch</h2>
            <select value={selectedOption} onChange={handleChange} style={{background:"transparent", color:"white"}}>
              <option value="">Select a batch</option>
              <option value="mern stacjk" onChange={(e)=>setBatch(e.target.value)}>Mern stack</option>
              <option value="option2" onChange={(e)=>setBatch(e.target.value)}>flutter</option>
              <option value="option3" onChange={(e)=>setBatch(e.target.value)}>ui design</option>
            </select>
            <p>Selected batch: {selectedOption}</p>
          </div> */}
  
        {/* <!--Checkbox--> */}
        <div className="mb-6 block min-h-[1.5rem] pl-[1.5rem]">
          <input
            className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
            type="checkbox"
            value=""
            id="checkboxDefault"
          />
          <label
            className="inline-block pl-[0.15rem] hover:cursor-pointer"
            htmlFor="checkboxDefault"
          >
            Check me out
          </label>
        </div>

        {/* <!--Submit button--> */}
        <TERipple rippleColor="light">
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