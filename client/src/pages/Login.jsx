import { useState} from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

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


    return(
        <div>
            <h1>Support CRM Login</h1>

            <form onSubmit={handlesubmit}>
                <div>
                    <label>Email</label>
                    <br/>
                    <input
                    type="email"
                    placeholder="Enter email"
                    value={(email)}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    ></input>
                </div>

                <br/>

                <div>
                    <label>Password</label>
                    <br/>
                    <input
                    type="password"
                    placeholder="Enter password"
                    value={(password)}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    ></input>
                </div>

                <br/>

                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}
export default Login;
