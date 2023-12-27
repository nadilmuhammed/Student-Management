  import {
      Card,
      Input,
      Checkbox,
      Button,
      Typography,
    } from "@material-tailwind/react";
  import axios from "axios";
  import { useEffect, useState } from "react";
  import { useParams } from "react-router-dom";
  import { errorToast, successToast } from "../Toastify/Toast";
    
    export default function SimpleRegistrationForm() {
  
      const [ store , setStore] = useState({
        username:"",
        email:"",
        password:""
      })

      const handlechange =(e)=>{
        console.log("Event:", e.target.name, e.target.value);
        setStore({ ...store,[e.target.name]: e.target.value });
      }

      // const [ name,SetName ] = useState('');
      // const [ email,SetEmail ] = useState('');
      // const [ password,SetPassword ] = useState('');
    

      let handleSubmit = async(e)=>{
        e.preventDefault();

      
        try {
          let response = await axios.put(`http://localhost:4000/api/admin/updateadmin/${localStorage.getItem("id")}`, store);
          console.log(response.data,"dtaaa");
          if(response.data){
            successToast("Updated");
          }

        } catch (error) {
          errorToast(error.message);
        }
      }

      const getadminData = async()=>{
        try {
          let response = await axios.get(`http://localhost:4000/api/admin/getadminID/${localStorage.getItem("id")}`)
          console.log(response.data);
          setStore(response.data)

        } catch (error) {
          console.log(error.message);
        }
      }

      useEffect(()=>{
        getadminData();
      },[])

      return (
        <Card className="flex-col justify-center items-center mb-3" color="transparent" shadow={false}>
          <Typography className="text-4xl font-bold text-black text font-serif" variant="h4" color="blue-gray">
            Edit your profile
          </Typography>
          <form onSubmit={handleSubmit}  className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
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
              <Typography variant="h6" color="blue-gray" className="-mb-3" >
                Your Email
              </Typography>
              <Input
                size="lg"
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              onChange={handlechange}
              name="email"
              value={store.email}
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
            </div>
            <Button type="submit" className="flex justify-center items-center mt-8 bg-black text-white w-auto ml-32 fullWidth">
              Submit
            </Button>
            {/* <p>{store.username}</p>
            <p>{store.email}</p>
            <p>{store.password}</p> */}
          </form>
        </Card>
      );
    }