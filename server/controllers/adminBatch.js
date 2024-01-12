import Trainer from "../models/Admintraine.js";
import Intern from "../models/admIntern.js";
import Batch from "../models/adminBatch.js";

export const createBatch = async (req, res) => {
  const { batch, trainerReference } = req.body;
  console.log(req.body);
  if (!batch) {
    return res.status(400).json({ message: "Batch is required" });
  }
  if (!trainerReference) {
    return res.status(400).json({ message: "Select a traine" });
  }
  let product = await Batch({ batch, trainerReference });
  console.log(req.body, "req.body");

  try {
    const result = await product.save();
    console.log(result);
    res.json({ result: result, status: true });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

export const updatebatch = async (req, res) => {
  const { id } = req.params;
  const { batch, trainerReference } = req.body;
  if (!batch) {
    return res.status(400).json({ message: "Batch is required" });
  }
  if (!trainerReference) {
    return res.status(400).json({ message: "Select a traine" });
  }
  try {
    const updatedUser = await Batch.findByIdAndUpdate(
      id,
      { $set: { batch, trainerReference } },
      { new: true }
    );
    res.status(201).json(updatedUser);
  } catch (error) {
    console.log("errr", error);
    res.json(error.message);
  }
};

export const deletebatch = async (req, res) => {
  console.log("delte", req.params);
  const { id } = req.params;
  try {

    const getIntern = await Intern.find({batch:id});

    if(getIntern.length > 0){
      return res.status(400).json({ message:"This batch has interns assigned to it."})
    }

    
    const result = await Batch.findByIdAndDelete(id);
    res.status(200).json(result);
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

export const getBatch = async (req, res) => {
  try {
    const result = await Batch.find();

    let getBatchall = result.map(async (inter) => {
      const { ...other } = inter;
      const trainer = await Trainer.find({_id: {$in: inter.trainerReference}});
      const { ...trainerOther } = trainer;
      const data = await Trainer.find({_id: {$in: inter.trainerReference}});
      const { ...dataOther } = data;
      console.log(data, "data");

      return { ...other._doc, trainerData: trainerOther._doc,trainernewData:data };
    });

    const getTrainers = await Promise.all(getBatchall);

    // console.log(result);
    res.status(200).json(getTrainers);
  } catch (error) {
    res.json(error.message);
  }
};

export const getBatchID = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Batch.findById(id);

    const resultraine = await Trainer.findById(result.trainerReference);
     let obj = {
      ...result._doc,
      trainerName:resultraine.name

     }

    res.json(obj);
    return true;
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};