import React, { useEffect, useState } from 'react'
import { HiHome } from "react-icons/hi2";
import { GiExitDoor } from "react-icons/gi";
import { TABS } from '../constants/data'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [employeeData, setEmployeeData] = useState(null);
    const native = useNavigate()
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
                native("/")
                console.error("Token is missing. Please log in again.");
                return;
            }



            const response = await axios.get(`http://localhost:8000/api/employee/${id}`, {
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
                setImage(`http://localhost:8000${response.data.photo}`);
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
            const response = await axios.put(`http://localhost:8000/api/employee/${userId}`, formDataToSend, {
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
        <div className='max-w-full'>
            <div className='flex items-center justify-between p-5'>
                <div className='flex gap-5'>
                    <HiHome size={25} />
                    <GiExitDoor size={25} onClick={handleLogout} />
                </div>
                <div>
                    <button className='h-[2rem] w-[10rem] bg-blue-500  text-white text-start pl-2 rounded-md'>Privileged User</button>
                </div>
            </div>

            <div className='flex border-b w-full gap-2 bg-gray-400 '>
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

            <h2 className='text-black text-xl font-bold flex items-center justify-center my-10'>View Employee Data</h2>

            <div className='  p-5 flex justify-between'>
                <div className='w-[700px]'>
                    <table className='border border-gray-300 w-full'>
                        <tbody>
                            <tr className='border border-gray-300'>
                                <td className='bg-gray-200 w-[50%] pl-3 font-bold py-1 border-r-2 border-gray-300'>Empolyee Name:</td>
                                <td>
                                    <p className='pl-3 border-none outline-none w-full'>{employeeData?.name}</p>
                                </td>
                            </tr>
                            <tr className='border border-gray-300'>
                                <td className='bg-gray-200 w-[50%] pl-3 font-bold py-1 border-r-2 border-gray-300'>Empolyee Type:</td>
                                <td>
                                    <p className='pl-3 border-none outline-none w-full'>{employeeData?.employment_type}</p>
                                </td>
                            </tr>
                            <tr className='border border-gray-300'>
                                <td className='bg-gray-200 w-[50%] pl-3 font-bold py-1 border-r-2 border-gray-300'>Contact Number:</td>
                                <td>
                                    <p className='pl-3 border-none outline-none w-full'>{employeeData?.contact_number}</p>
                                </td>
                            </tr>
                            <tr className='border border-gray-300'>
                                <td className='bg-gray-200 w-[50%] pl-3 font-bold py-1 border-r-2 border-gray-300'>Job Location:</td>
                                <td>
                                    <p className='pl-3 border-none outline-none w-full'>{employeeData?.job_location}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>


                <div className='w-[700px]'>
                    <table className='border border-gray-300 w-full'>
                        <tbody>
                            <tr className='border border-gray-300'>
                                <td className='bg-gray-200 w-[50%] pl-3 font-bold py-1 border-r-2 border-gray-300'>Empolyee ID:</td>
                                <td>
                                    <p className='pl-3 border-none outline-none w-full'>{employeeData?.id}</p>
                                </td>
                            </tr>
                            <tr className='border border-gray-300'>
                                <td className='bg-gray-200 w-[50%] pl-3 font-bold py-1 border-r-2 border-gray-300'>Jo Title:</td>
                                <td>
                                    <p className='pl-3 border-none outline-none w-full'>{employeeData?.job_title}</p>
                                </td>
                            </tr>
                            <tr className='border border-gray-300'>
                                <td className='bg-gray-200 w-[50%] pl-3 font-bold py-1 border-r-2 border-gray-300'>Date of Joining:</td>
                                <td>
                                    <p className='pl-3 border-none outline-none w-full'>{employeeData?.date_of_joining}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className='p-5 flex justify-between'>
                <div className="mt-6 w-[700px]">
                    <h3 className="font-bold bg-black text-white p-2">Address:</h3>
                    <table className='border border-gray-300 w-full'>
                        <tbody>
                            <tr className='border border-gray-300'>

                                <td className='pl-3'>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData?.address}
                                        onChange={handleInputChange}
                                        className=" pl-2 h-[2rem] text-sm font-bold border-2 w-[500px] my-2 outline-none rounded-lg "
                                    />
                                </td>
                            </tr>
                            <tr className='border border-gray-300'>

                                <td className='pl-3'>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData?.city}
                                        onChange={handleInputChange}
                                        className=" pl-2 h-[2rem] text-sm font-bold border-2 w-[500px] my-2 outline-none rounded-lg "
                                    />
                                </td>
                            </tr>
                            <tr className='border border-gray-300'>

                                <td className='pl-3'>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData?.state}
                                        onChange={handleInputChange}
                                        className=" pl-2 h-[2rem] text-sm font-bold border-2 w-[500px] my-2 outline-none rounded-lg "
                                    />
                                </td>
                            </tr>
                            <tr className='border border-gray-300'>

                                <td className='pl-3'>
                                    <input
                                        type="text"
                                        name="zipcode"
                                        value={formData?.zipcode}
                                        onChange={handleInputChange}
                                        className=" pl-2 h-[2rem] text-sm font-bold border-2 w-[500px] my-2 outline-none rounded-lg "
                                    />
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>

                <div className="w-[700px] flex items-center justify-center">
                    <label className="w-60 h-60 border-2 rounded-[50px] shadow-md bg-gray-50 border-gray-300 flex items-center justify-center cursor-pointer relative overflow-hidden">
                        {image ? (
                            <img src={image} alt="Employee" className="w-full h-full object-cover" />
                        ) : (
                            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-300 rounded-lg p-3 text-sm">
                                Click to upload image
                            </span>
                        )}
                        <input type="file" className="hidden" onChange={handleImageUpload} />
                    </label>
                </div>



            </div>
            <div className='pl-3'>
                <div className="flex justify-start mt-4">
                    <button onClick={handleSubmit} className="bg-blue-600 rounded-lg text-white px-4 py-2 mr-2">Submit</button>
                    <button onClick={handleCancel} className="bg-gray-600 rounded-lg text-white px-4 py-2">Cancel</button>
                </div>
            </div>

        </div>
    )
}

export default Home


