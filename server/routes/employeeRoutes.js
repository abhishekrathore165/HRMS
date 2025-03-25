import express from "express";
import { getEmployee, updateEmployeeDetails } from "../controller/employeeController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/multerConfig.js";


const router = express.Router();

router.get("/:id",authMiddleware,getEmployee);
router.put('/:id', authMiddleware, upload.single("image"),updateEmployeeDetails);



export default router