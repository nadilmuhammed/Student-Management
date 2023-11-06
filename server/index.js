import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import Admin from "./models/Admin.js";
import adminRoute from "./routes/admin.js";
import UUser from "./models/update.js";

const app = express();

app.use(cors());
app.use(morgan("common"));

app.use(express.json()); // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use("/api/admin", adminRoute);

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
