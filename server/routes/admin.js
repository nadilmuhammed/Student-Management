import express from "express";
import { login, register } from "../controllers/admin.js";
import { createtraine } from "../controllers/admintraine.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// admintraine
router.post("/createtraine", createtraine)

export default router;
