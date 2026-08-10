import { useEffect, useState } from "react";
import api from "../services/api";
import { useLocation, useNavigate } from "react-router-dom";
import "./Tickets.css";
import Navbar from "../components/Navbar";

function Tickets() {
  const location = useLocation();
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const [message, setMessage] = useState(
    location.state?.successMessage || ""
  );

  // Auto-hide success message
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  // Fetch tickets
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await api.get("/tickets");

        console.log("TICKETS:", response.data);

        setTickets(response.data.data);
      } catch (error) {
        console.log("TICKETS ERROR:", error);
      }
    };

    fetchTickets();
  }, []);

  // Delete ticket
  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/tickets/${id}`);

      console.log("DELETE TICKET:", response.data);

      setTickets((prevTickets) =>
        prevTickets.filter((ticket) => ticket._id !== id)
      );
    } catch (error) {
      console.log("DELETE TICKET ERROR:", error);
      console.log("SERVER RESPONSE:", error.response?.data);
    }
  };

  // Search + status filter
  const filteredTickets = tickets.filter((ticket) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      (ticket.ticketId || "").toLowerCase().includes(searchText) ||
      (ticket.customerName || "").toLowerCase().includes(searchText) ||
      (ticket.subject || "").toLowerCase().includes(searchText);

    const matchesStatus =
      status === "All" || ticket.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <Navbar />

      <div className="tickets-page">

        <h1>Tickets</h1>

        {/* Success message */}
        {message && (
          <div className="success-message">
            {message}
          </div>
        )}

        {/* Search */}
        <input
          type="text"
          placeholder="Search tickets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Status filter */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>

        {/* Tickets */}
        {filteredTickets.map((ticket) => (
          <div
            className="ticket-card"
            key={ticket._id}
          >
            <h3 className="ticket-id">
              {ticket.ticketId || "No Ticket ID"}
            </h3>

            <p>
              Customer: {ticket.customerName}
            </p>

            <p>
              Subject: {ticket.subject}
            </p>

            <p>
              Status: {ticket.status}
            </p>

            <div className="ticket-actions">

              <button
                className="edit-btn"
                onClick={() =>
                  navigate(`/tickets/edit/${ticket._id}`)
                }
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() =>
                  handleDelete(ticket._id)
                }
              >
                Delete
              </button>

            </div>

            <hr />
          </div>
        ))}

      </div>
    </div>
  );
}

export default Tickets;