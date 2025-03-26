import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});




const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "employees",
    allowed_formats: ["jpg", "png", "jpeg"],
    transformation: [{ width: 500, height: 500, crop: "limit" }], 
    resource_type: "image",
    public_id: (req, file) => `employee_${Date.now()}_${file.originalname}`,
  },
});

const upload = multer({ storage });


export { cloudinary, upload };
