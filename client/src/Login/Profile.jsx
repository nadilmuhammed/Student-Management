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

    // const [ getadmin,SetGetadmin ] = useState([]);
    const [ name,SetName ] = useState('');
    const [ email,SetEmail ] = useState('');
    const [ password,SetPassword ] = useState('');

    const { id } = useParams();
    // let handleSubmit = async(e)=>{
    //   e.preventDefault();
    //   console.log(id);

    //   try {
    //     let response = await axios.put(`http://localhost/api/admin/updateadmin/${id}`,{
    //       username:name,
    //       email:email,
    //       password:password
    //     });
    //     if(response.data){
    //       successToast("Updated");
    //     }

    //   } catch (error) {
    //     errorToast(error.message);
    //   }
    // }

    const getadminData = async(id)=>{
      console.log(id);
      try {
        let response = await axios.get(`http://localhost:4000/api/admin/getadminID/${id}`)
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    }

    useEffect(()=>{
      getadminData(id);
    },[])

    return (
       <Card className="flex-col justify-center items-center mb-3" color="transparent" shadow={false}>
        <Typography className="text-3xl" variant="h4" color="blue-gray">
          Profile
        </Typography>
        {/* <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to register.
        </Typography> */}
        <form  className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3" 
            onChange={(e) => SetName(e.target.value)}>
              Username
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3"
            onChange={(e) => SetEmail(e.target.value)}>
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
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
              onChange={(e) => SetPassword(e.target.value)}
            />
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                I agree the
                <a
                  href="#"
                  className="font-medium transition-colors hover:text-gray-900"
                >
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button type="submit" className="flex justify-center items-center mt-6 bg-black text-white w-auto ml-32 fullWidth">
            sign up
          </Button>
        </form>
      </Card>
    );
  }