import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { successToast,errorToast } from "../../Toastify/Toast.js"

export default function SimpleRegistrationForm() {

  const [ store , setStore] = useState({
    name:"",
    email:"",
    username:"",
    password:"",
    image:"",
    id_no:""
  })

  const handlechange =(e)=>{
    console.log("Event:", e.target.name, e.target.value);
    setStore({ ...store,[e.target.name]: e.target.value });
  }


  let handleSubmit = async(e)=>{
    e.preventDefault();
  
    try {
      let response = await axios.put(`http://localhost:4000/api/trainer/updateadmin/${localStorage.getItem("id")}`, store);
      console.log(response.data,"dtaaa");
      if(response.data){
        successToast("Updated");
      }

    } catch (error) {
      errorToast(error.response.data.message);
    }
  }

  const getTrainerData = async()=>{
    try {
      let response = await axios.get(`http://localhost:4000/api/trainer/trainerdata/${localStorage.getItem("id")}`)
      console.log(response.data);
      setStore(response.data)

    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(()=>{
    getTrainerData();
  },[])

  return (
    <Card className="flex-col justify-center items-center mb-3" color="transparent" shadow={false}>
      <Typography className="text-4xl font-bold text-black text font-serif" variant="h4" color="blue-gray">
        Edit your profile
      </Typography>
      <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            name
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
              
            }}
            onChange={handlechange}
            name="name"
            value={store.name}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3" >
            Your Email
          </Typography>
          <Input
          type="email"
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          onChange={handlechange}
          name="email"
          value={store.email}
          /><Typography variant="h6" color="blue-gray" className="-mb-3" >
          Username
        </Typography>
        <Input
          size="lg"
          placeholder="name@mail.com"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        onChange={handlechange}
        name="username"
        value={store.username}
        />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Password
          </Typography>
          <Input
            type="password"
            size="lg"
            placeholder="********"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={handlechange}
            name="password"
            value={store.password}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3" >
          Image
          </Typography>
          <Input
            type="file"
            accept="image/jpg,image/jpeg,image/png"
            size="lg"
            placeholder="upload image"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            // labelProps={{
            //   className: "before:content-none after:content-none",
            // }}
          onChange={handlechange}
          name="image"
          value={store.image}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3" >
            id_no
          </Typography>
          <Input
            type="number"
            size="lg"
            placeholder="number"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          onChange={handlechange}
          name="id_no"
          value={store.id_no}
          />
        </div>
        <Button type="submit" className="flex justify-center items-center mt-8 bg-black text-white w-auto ml-32 fullWidth">
          Submit
        </Button>
        <p>{store.username}</p>
        <p>{store.email}</p>
        <p>{store.password}</p>
        <p>{store.name}</p>
        <p>{store.image}</p>
      </form>
    </Card>
  );
}