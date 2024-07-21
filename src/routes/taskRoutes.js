import express from "express";
const router = express.Router();
import {
    createTask,
    getTasks
} from "../controllers/taskController.js";

import { protect } from "../middleware/authMiddleware.js";


router.post("/create", protect, createTask);

router.get("/list", protect, getTasks);






export default router;