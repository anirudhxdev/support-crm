import { useState} from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Login.css";

function Login(){
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");

    const navigate = useNavigate();

    const handlesubmit = async (e) =>{
        e.preventDefault();

        try{
            const response = await api.post("/auth/login",{
                email,
                password,
            });
            console.log("LOGIN RESPONSE:" , response.data);
            localStorage.setItem("token", response.data.token);

            navigate("/dashboard");
        }catch(error){
            console.log("Login Error:", error);
            console.log("Response:", error.response);
            alert(error.response?.data?.message || error.message);
        }
    };


    return (
  <div className="login-page">

    <div className="login-card">

      <div className="login-header">
        <h1>Support CRM</h1>
        <p>Welcome back! Please login to your account.</p>
      </div>

      <form onSubmit={handlesubmit}>

        <div className="login-form-group">
          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="login-form-group">
          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="login-btn" type="submit">
          Login
        </button>

      </form>

    </div>

  </div>
);
}
export default Login;
