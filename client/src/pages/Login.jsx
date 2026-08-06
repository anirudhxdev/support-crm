import { useState} from "react";

function Login(){
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");

    return(
        <div>
            <h1>Support CRM Login</h1>

            <form>
                <div>
                    <label>Email</label>
                    <br/>
                    <input
                    type="email"
                    placeholder="Enter email"
                    value={(email)}
                    onChange={(e) => setEmail(e.target.value)}
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
