import { useEffect, useState } from "react";
import api from "../services/api";
import { useLocation, useNavigate } from "react-router-dom";

function Tickets() {
  const location = useLocation();

  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const navigate = useNavigate();

 
  const successMessage = location.state?.successMessage;
  
  const [message, setMessage] = useState(
    location.state?.successMessage || ""
  );
  useEffect(() => {
    if(message){
      const timer = setTimeout(() =>{
        setMessage("");
      },3000);
      return () => clearTimeout (timer);
    }
  }, [message]);
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
      <h1>Tickets</h1>

      
     {message && (
  <p>{message}</p>
   )}

      
      <input
        type="text"
        placeholder="Search tickets..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      
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
        <div key={ticket._id}>
          <h3>{ticket.ticketId || "No Ticket ID"}</h3>

          <p>
            Customer: {ticket.customerName}
          </p>

          <p>
            Subject: {ticket.subject}
          </p>

          <p>
            Status: {ticket.status}
          </p>

          <button onClick={() => navigate(`/tickets/edit/${ticket._id}`)}>
            Edit
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default Tickets;