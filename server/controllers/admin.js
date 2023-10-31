import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const saltRounds = 10;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    const newAdmin = new Admin({ email, password: hash });
    const savedAdmin = await newAdmin.save();
    res.status(200).json(savedAdmin);
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    console.log(email);
    const user = await Admin.findOne({ email: email });

    if (!user) {
      res.status(404).json({ message: "User not found!" });
    }

    const isPassword = await bcrypt.compare(req.body.password, user.password);
    console.log(isPassword);

    if (isPassword) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found!" });
    }

    // const newAdmin = new Admin({ email,password:hash })
    // const savedAdmin = await newAdmin.save();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};
