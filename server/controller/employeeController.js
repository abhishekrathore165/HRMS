import { getEmployeeById, updateAddress, updatePhoto } from "../models/employeeModel.js";

 export const getEmployee = async(req,res)=>{
   try {
      const employee = await getEmployeeById(req.params.id);
      if(!employee) return res.status(401).json({message:"Employee not found"});

      res.json(employee);
   } catch (error) {
     res.status(500).json({error:error.message});
   }
 };


 export const updateEmployeeDetails = async (req, res) => {
  try {
      const { id } = req.params;
      const { address, city, state, zipcode } = req.body;
      
      let addressResponse = null;
      let imageResponse = null;
      let photo = null;

      // Check if a file is uploaded
      if (req.file) {
          photo = `/uploads/${req.file.filename}`;
          imageResponse = await updatePhoto(id, photo);
      }

      // Check if address details are provided
      if (address || city || state || zipcode) {
          addressResponse = await updateAddress(id, { address, city, state, zipcode });
      }

      // If neither address nor image was provided, return an error
      if (!addressResponse && !imageResponse) {
          return res.status(400).json({ message: "No data provided for update" });
      }

      res.json({
          message: "Employee details updated successfully!",
          imageUrl: photo ? `http://localhost:8000${photo}` : null,
          address: addressResponse,
          image: imageResponse,
      });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
