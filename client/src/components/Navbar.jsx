import { useNavigate } from "react-router-dom";
import "./Navbar.css";
function Navbar(){
    const navigate = useNavigate();
    const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };
    return(
        <nav className="navbar">
            <h2>Support CRM</h2>

            <div className="navbar-links">
                <button onClick={() => navigate("/dashboard")}>Dashboard</button>
                <button onClick={() => navigate("/tickets")}>Tickets</button>
                <button onClick={() => navigate("/tickets/create")}>Create Tickets</button>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
}

export default Navbar;