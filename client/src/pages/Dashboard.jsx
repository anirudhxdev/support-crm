import { useEffect, useState } from "react";
import api from "../services/api";
import "./Dashboard.css";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recentTickets, setRecentTickets] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch ticket statistics
        const statsResponse = await api.get("/tickets/stats");

        console.log("STATS:", statsResponse.data);

        setStats(statsResponse.data.data);

        // Fetch all tickets
        const ticketsResponse = await api.get("/tickets");

        console.log("TICKETS:", ticketsResponse.data);

        // Get latest 5 tickets
        const tickets = ticketsResponse.data.data || [];

        const latestTickets = tickets
          .sort(
            (a, b) =>
              new Date(b.createdAt) - new Date(a.createdAt)
          )
          .slice(0, 5);

        setRecentTickets(latestTickets);
      } catch (error) {
        console.log("DASHBOARD ERROR:", error);
        console.log("RESPONSE:", error.response);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <>
      <Navbar />

      <div className="dashboard">

        <div className="dashboard-header">
          <h1>Dashboard</h1>
        </div>

        {/* Statistics */}
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

        {/* Recent Tickets */}
        <div className="recent-tickets">

          <div className="recent-tickets-header">
            <h2>Recent Tickets</h2>
          </div>

          {recentTickets.length === 0 ? (
            <p>No tickets found.</p>
          ) : (
            <div className="tickets-list">

              {recentTickets.map((ticket) => (
                <div
                  className="ticket-card"
                  key={ticket._id}
                >

                  <div className="ticket-info">
                    <h3>{ticket.ticketId}</h3>

                    <p>
                      <strong>Customer:</strong>{" "}
                      {ticket.customerName}
                    </p>

                    <p>
                      <strong>Subject:</strong>{" "}
                      {ticket.subject}
                    </p>
                  </div>

                  <div className="ticket-status">
                    <span>
                      {ticket.status}
                    </span>
                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </>
  );
}

export default Dashboard;