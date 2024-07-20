import express from "express";
const router = express.Router();
import {
  createForm, 
  getAllForms,
  updateForm
} from "../controllers/formController.js";

import { protect } from "../middleware/authMiddleware.js";


router.post("/create", protect, createForm);

router.get("/list", protect, getAllForms);

router.put("/update/:id", protect, updateForm);




export default router;