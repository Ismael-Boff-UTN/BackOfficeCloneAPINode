import express from "express";
const router = express.Router();
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getAllUsers,
    deleteUser,
    updateUserById
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";


router.post("/auth", authUser);

router.post("/", registerUser);

router.post("/logout", logoutUser);

router.get("/profile", protect, getUserProfile);

router.put("/profile", protect, updateUserProfile);

router.get("/list", protect, getAllUsers);

router.delete("/:id", protect, deleteUser);

router.put("/update/:id", protect, updateUserById);













export default router;