import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { FaEdit } from "react-icons/fa"
 
export default function SimpleCard({data}) {

  const { name, interns } = data


  return (
    <Card className="mt-6 w-96 bg-gradient-to-r from-blue-300  to-blue-900 rounded-2xl">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          <span>Batch </span><span>{name}</span>
        </Typography>
        <Typography>
          <ul>
            <li>{interns}</li>
          </ul>
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 ">
        <Button className=""><FaEdit className="text-xl text-black"/></Button>
      </CardFooter>
    </Card>

  );
}