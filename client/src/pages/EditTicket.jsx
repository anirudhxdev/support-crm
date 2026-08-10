import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./TicketForm.css";

function EditTicket() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await api.get(`/tickets/${id}`);

        console.log("UPDATE TICKET:", response.data);

        setTicket(response.data.data);
      } catch (error) {
        console.log("TICKET ERROR:", error);
      }
    };

    fetchTicket();
  }, [id]);

  if (!ticket) {
    return <p>Loading ticket...</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put(`/tickets/${id}`, ticket);

      console.log("UPDATE TICKET:", response.data);

      navigate("/tickets", {
        state: {
          successMessage: "Ticket updated successfully!",
        },
      });
    } catch (error) {
      console.log("UPDATE TICKET ERROR:", error);
      console.log("SERVER RESPONSE:", error.response?.data);
    }
  };

  return (
    <>
      <Navbar />

      <div className="ticket-form-page">

        <h1>Edit Ticket</h1>

        <p className="form-subtitle">
          Update the customer's ticket details
        </p>

        <form className="ticket-form" onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Ticket ID</label>

            <input
              type="text"
              value={ticket.ticketId}
              disabled
            />
          </div>

          <div className="form-group">
            <label>Customer Name</label>

            <input
              type="text"
              value={ticket.customerName}
              onChange={(e) =>
                setTicket({
                  ...ticket,
                  customerName: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label>Customer Email</label>

            <input
              type="email"
              value={ticket.customerEmail}
              onChange={(e) =>
                setTicket({
                  ...ticket,
                  customerEmail: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label>Subject</label>

            <input
              type="text"
              value={ticket.subject}
              onChange={(e) =>
                setTicket({
                  ...ticket,
                  subject: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              value={ticket.description}
              onChange={(e) =>
                setTicket({
                  ...ticket,
                  description: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label>Status</label>

            <select
              value={ticket.status}
              onChange={(e) =>
                setTicket({
                  ...ticket,
                  status: e.target.value,
                })
              }
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <button className="submit-btn" type="submit">
            Save Changes
          </button>

        </form>
      </div>
    </>
  );
}

export default EditTicket;