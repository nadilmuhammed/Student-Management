import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import adminRoute from "./routes/admin.js";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();

app.use(cors());
app.use(morgan("common"));

app.use(express.json()); // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use("/api/admin", adminRoute);

// app.use('/uploads', express.static( 'uploads'));
app.use('/uploads', express.static(join(__dirname, 'uploads')));
// 


// console.log(__dirname);


dotenv.config();




// admin login get method
app.get("/admin", async (req, res) => {
  try {
    const result = await mongoose.connection
      .collection("admins")
      .find()
      .toArray();
    console.log(result);
    res.json({ result: result, status: true });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
});

const connect = async (next) => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to database");
  } catch (error) {
    const { status, message } = error;
    console.log(message);
  }
};

app.listen(process.env.PORT, () => {
  connect();
  console.log(`Server running... ${process.env.PORT} `);
});
