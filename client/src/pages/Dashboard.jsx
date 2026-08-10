import { useEffect, useState } from "react";
import api from "../services/api";
import "./Dashboard.css";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/tickets/stats");

        console.log("STATS:", response.data);

        setStats(response.data.data);
      } catch (error) {
        console.log("STATS ERROR:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="dashboard">

        <div className="dashboard-header">
          <h1>Dashboard</h1>
        </div>

        {!stats ? (
          <p>Loading dashboard...</p>
        ) : (
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
    </div>
  );
}

export default Dashboard;