import express from "express";
import { getEmployee, updateEmployeeDetails } from "../controller/employeeController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { upload } from "../middleware/cloundinaryConfig.js";



const router = express.Router();

router.get("/:id",authMiddleware,getEmployee);
router.put('/:id', authMiddleware, upload.single("photo"),updateEmployeeDetails);



export default router