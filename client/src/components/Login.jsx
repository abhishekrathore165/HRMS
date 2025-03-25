import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/auth/login", { email, password });

      localStorage.setItem("token", response.data?.token);
      
      localStorage.setItem("userId", response.data?.user?.id);

      toast.success("Login Successful!", { position: "top-right", autoClose: 2000 });

      setTimeout(() => navigate("/home"), 2000);

    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage, { position: "top-right", autoClose: 2000 });
    }
  };

  return (
    <div className="h-screen bg-blue-700 flex flex-col justify-center items-center relative bg-cover bg-center"
      style={{
        backgroundImage: `url("https://st.depositphotos.com/1635204/3951/i/450/depositphotos_39519879-Elegant-dark-blue-background.jpg")`,
      }}
    >

      <div className="p-8 rounded-[50px] shadow-lg w-96 border-2 border-white bg-black/40 backdrop-blur-sm">
        <h2 className="text-center text-white text-2xl font-bold mb-4">HRMS</h2>
        <form onSubmit={handleSubmit}>
          <label className="text-white mb-1">Email:</label>
          <input
            type="email"
            placeholder="Your Email Id"
            className="w-full p-2 mb-4 border rounded outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="text-white">Password:</label>
          <input
            type="password"
            placeholder="Enter Password"
            className="w-full p-2 mb-4 border rounded outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Login
          </button>
        </form>
      </div>


      <div className="absolute bottom-4 flex flex-col items-center w-full text-white text-center">
        <img src="src/assets/logo.png" alt="logo" className="w-20 h-20 mb-2" />
        <p>2024 Infoway Solutions LLC</p>
      </div>
    </div>

  );
};

export default Login;
