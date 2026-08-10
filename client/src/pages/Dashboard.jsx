import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Dashboard.css";

function Dashboard(){
    
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/", { replace: true });
    };

    useEffect(() => {
        const fethcStates = async () => {
            try {
                const response = await api.get("/tickets/stats");

                console.log("STATS:" , response.data);

                setStats(response.data.data);
            }catch(error){
                console.log("STATS ERROR:", error);
            }
        };
        fethcStates();

    },[]);

    return(
        <div className="dashboard">

           <div className="dashboard-header">
                <h1>Dashboard</h1>

                <button
                className="logout-btn"
                onClick={handleLogout}
                >
                Logout
                </button>
            </div>
            {!stats ?(
                <p>Loading dashboard...</p>
            ) :(
                <div className="stats-container">

                    <div className="stat-card">
                        <h3>Total Tickets</h3>
                        <p>{stats.total}</p>
                    </div>

                    <div className="stat-card">
                         <h3>Open</h3>
                        <p>{stats.open}</p>
                    </div>

                    <div className="stat-card">
                        <h3>In Progress</h3>
                        <p>{stats.inProgress}</p>
                    </div>

                    <div className="stat-card">
                        <h3>Closed</h3>
                        <p>{stats.closed}</p>
                    </div>

                </div>
            )}
        </div>
    );
}

export default Dashboard;