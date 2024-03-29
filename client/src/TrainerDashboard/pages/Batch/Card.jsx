import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import axios from "axios";
import { FaEdit } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import { errorToast, successToast } from "../../../Toastify/Toast";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
 
export default function SimpleCard({data,setRefresh,refresh}) {

  const {_id, name, internData, studentsData } = data
  console.log(studentsData,"hiii");
  


  const handleDelete = async(id)=>{
    try {
      const response = await axios.delete(`http://localhost:4000/api/trainer/deletetrainerbatch/${id}`);
      successToast("Deleted")
     setRefresh(!refresh)
    } catch (error) {
      errorToast(error.response.data.message)
    }
  }
  

  
  


  return (
    <Card className="mt-6 w-96 bg-gradient-to-r from-blue-300  to-blue-900 rounded-2xl">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2 text-3xl">
          <span>{name}</span>
        </Typography>
        <Typography>
          <ul style={{listStyleType:"number",padding:"1rem"}}>
            {
              internData.map((item)=>{
               return( 
                 <li>{item.name}</li>
               )
              })
            }
          </ul>
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 ">
        <NavLink to={`/trainer/updatebatch/${_id}`}>
          <Button className=""><FaEdit className="text-xl text-black"/></Button>
        </NavLink>
        <Button onClick={() => handleDelete(_id)}><MdDelete className="text-xl text-black"/></Button>
      </CardFooter>
    </Card>

  );
}