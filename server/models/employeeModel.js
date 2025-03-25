import pool from "../config/db.js";

export const getEmployeeById =async(id)=>{
    try {
        const { rows } = await pool.query("SELECT * FROM employees WHERE id=$1", [id]);
        return rows[0] || null;  // ✅ Return `null` if no employee found
     } catch (error) {
        console.error("Database error:", error);
        throw new Error("Database query failed");  // ✅ Ensure proper error handling
     }
}

export const updateAddress = async(id,data)=>{
   const {address,city,state,zipcode}=data;
    await pool.query(`UPDATE employees SET address=$1, city=$2, state=$3, zipcode=$4 WHERE id=$5`,[address,city,state,zipcode,id]);
    return {message:"Employee update successfully"}
}


export const updatePhoto = async(id,photo)=>{
    await pool.query(
        `UPDATE employees SET photo=$1 WHERE id=$2`,[photo,id]
    )
    return {message:"Employee image updated successfully"}
}