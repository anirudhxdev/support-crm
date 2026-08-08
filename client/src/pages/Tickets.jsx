import { useEffect, useState } from "react";
import api from "../services/api";

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

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
      ticket.ticketId.toLowerCase().includes(searchText) ||
      ticket.customerName.toLowerCase().includes(searchText) ||
      ticket.subject.toLowerCase().includes(searchText);

    const matchesStatus =
      status === "All" || ticket.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <h1>Tickets</h1>

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

      {filteredTickets.map((ticket) => (
        <div key={ticket._id}>
          <h3>{ticket.ticketId}</h3>

          <p>Customer: {ticket.customerName}</p>

          <p>Subject: {ticket.subject}</p>

          <p>Status: {ticket.status}</p>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default Tickets;