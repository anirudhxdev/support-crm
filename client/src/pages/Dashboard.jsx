import { useEffect, useState } from "react";
import api from "../services/api";
import "./Dashboard.css";

function Dashboard(){
    const [stats, setStats] = useState(null);

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

            <h1>Dashboard</h1>

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