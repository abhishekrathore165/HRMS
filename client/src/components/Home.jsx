import React, { useEffect, useState } from 'react'
import { HiHome } from "react-icons/hi2";
import { GiExitDoor } from "react-icons/gi";
import { TABS } from '../constants/data'
import axios from 'axios';
import { toast } from 'react-toastify';


const API = "https://server-sw0p.onrender.com/api/employee/"

const Home = () => {
    const [employeeData, setEmployeeData] = useState(null);
    const [formData, setFormData] = useState({
        address: "",
        city: "",
        state: "",
        zipcode: "",
    })



    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem("userId");

        if (userId) {
            fetchEmployeeData(userId);
        } else {

            console.error("User ID is missing!");
        }
    }, []);

    const fetchEmployeeData = async (id) => {
        try {

            const token = localStorage.getItem("token");

            if (!token) {
                console.error("Token is missing. Please log in again.");
                return;
            }



            const response = await axios.get(`${API}${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setEmployeeData(response.data);

            setFormData({
                address: response.data.address || "",
                city: response.data.city || "",
                state: response.data.state || "",
                zipcode: response.data.zipcode || "",
            })

            if (response.data?.photo) {
                setImage(`https://server-sw0p.onrender.com${response.data.photo}`);
            } else {
                console.warn("No image found in response.");
            }

        } catch (error) {
            console.error("Error fetching employee data:", error.response ? error.response.data : error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };



    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            setImageFile(file);
        }

    };


    const handleSubmit = async () => {

        const userId = localStorage.getItem("userId");

        if (!userId) {
            console.error("User ID is missing!");
            return;
        }

        const token = localStorage.getItem("token");

        if (!token) {
            console.error("Token is missing. Please log in again.");
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("address", formData.address);
        formDataToSend.append("city", formData.city);
        formDataToSend.append("state", formData.state);
        formDataToSend.append("zipcode", formData.zipcode);

        if (imageFile) {
            formDataToSend.append("image", imageFile);
        }

        try {
            const response = await axios.put(`${API}${userId}`, formDataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            toast.success("Employee details updated successfully!");

            fetchEmployeeData(userId);

        } catch (error) {
            console.error("Error updating employee data:", error.response ? error.response.data : error);
        }
    };

    const handleCancel = () => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            console.error("User ID is missing!");
            return;
        }

        fetchEmployeeData(userId);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };


    return (
        <div className="max-w-full p-4">

            <div className="flex items-center justify-between p-5">
                <div className="flex gap-5">
                    <HiHome size={25} />
                    <GiExitDoor size={25} onClick={handleLogout} />
                </div>
                <button className="h-8 w-40 bg-blue-500 text-white text-start pl-2 rounded-md">
                    Privileged User
                </button>
            </div>

        
            <div className='xl:flex hidden border-b w-full gap-2 bg-gray-400 '>
                {
                    TABS.map((tab, index) => (
                        <button
                            key={index}
                            className={`h-[2rem] w-[12rem] text-start pl-3  text-sm ${index == 0 ? "bg-blue-600 rounded-t-lg text-white" : "bg-gray-300 rounded-t-lg"}`}>
                            {tab}
                        </button>
                    ))
                }

            </div>

         
            <h2 className="text-black text-xl font-bold flex justify-center my-6">
                View Employee Data
            </h2>

      
            <div className="p-5 flex flex-wrap gap-5 justify-center">
              
                <div className="w-full md:w-[48%]">
                    <table className="border border-gray-300 w-full">
                        <tbody>
                            {[
                                { label: "Employee Name:", value: employeeData?.name },
                                { label: "Employee Type:", value: employeeData?.employment_type },
                                { label: "Contact Number:", value: employeeData?.contact_number },
                                { label: "Job Location:", value: employeeData?.job_location },
                            ].map((item, index) => (
                                <tr key={index} className="border border-gray-300">
                                    <td className="bg-gray-200 pl-3 font-bold py-2 border-r-2">
                                        {item.label}
                                    </td>
                                    <td className="pl-3">{item.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

          
                <div className="w-full md:w-[48%]">
                    <table className="border border-gray-300 w-full">
                        <tbody>
                            {[
                                { label: "Employee ID:", value: employeeData?.id },
                                { label: "Job Title:", value: employeeData?.job_title },
                                { label: "Date of Joining:", value: employeeData?.date_of_joining },
                            ].map((item, index) => (
                                <tr key={index} className="border border-gray-300">
                                    <td className="bg-gray-200 pl-3 font-bold py-2 border-r-2">
                                        {item.label}
                                    </td>
                                    <td className="pl-3">{item.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="p-5 flex flex-wrap gap-5 justify-center">
             
                <div className="w-full md:w-[48%]">
                    <h3 className="font-bold bg-black text-white p-2">Address:</h3>
                    <table className="border border-gray-300 w-full">
                        <tbody>
                            {["address", "city", "state", "zipcode"].map((field, index) => (
                                <tr key={index} className="border border-gray-300">
                                    <td className="pl-3">
                                        <input
                                            type="text"
                                            name={field}
                                            value={formData?.[field]}
                                            onChange={handleInputChange}
                                            className="pl-2 h-10 text-sm font-bold border-2 w-full my-2 outline-none rounded-lg"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

           
                <div className="w-full md:w-[48%] flex items-center justify-center">
                    <label className="w-40 h-40 md:w-60 md:h-60 border-2 rounded-lg shadow-md bg-gray-50 border-gray-300 flex items-center justify-center cursor-pointer relative overflow-hidden">
                        {image ? (
                            <img src={image} alt="Employee" className="w-full h-full object-cover" />
                        ) : (
                            <span className="absolute text-center bg-gray-300 p-2 text-sm">
                                Click to upload image
                            </span>
                        )}
                        <input type="file" className="hidden" onChange={handleImageUpload} />
                    </label>
                </div>
            </div>

            <div className="p-5">
                <div className="flex justify-start">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 rounded-lg text-white px-4 py-2 mr-2"
                    >
                        Submit
                    </button>
                    <button
                        onClick={handleCancel}
                        className="bg-gray-600 rounded-lg text-white px-4 py-2"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Home


