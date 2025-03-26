import express from "express";
import { getEmployee, updateEmployeeDetails } from "../controller/employeeController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { upload } from "../middleware/cloundinaryConfig.js";
import multer from "multer";


const router = express.Router();

router.get("/:id",authMiddleware,getEmployee);
const uploadMiddleware = upload.single("image");
router.put('/:id', authMiddleware, (req, res, next) => {
    uploadMiddleware(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: "Multer upload error: " + err.message });
        } else if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
        next();
    });
}, updateEmployeeDetails);



export default router