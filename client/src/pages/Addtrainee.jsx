import axios from "axios";
import React, { useState } from "react";
import { errorToast,successToast } from "../Toastify/Toast";
import { TEInput, TERipple } from "tw-elements-react";


export default function BasicExample({setRefresh,refresh}) {


  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post(`http://localhost:4000/api/admin/createtraine`,{
          name:name,
          email:email
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
        className="mb-5"
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