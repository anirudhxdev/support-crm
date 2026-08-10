import api from "../services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./TicketForm.css";

function CreateTicket() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    subject: "",
    description: "",
    status: "Open",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await api.post("/tickets", formData);

      console.log("CREATE TICKET:", response.data);

      setFormData({
        customerName: "",
        customerEmail: "",
        subject: "",
        description: "",
        status: "Open",
      });

      navigate("/tickets", {
        state: {
          successMessage: "Ticket created successfully!",
        },
      });
    } catch (error) {
      console.log("CREATE TICKET ERROR:", error);
      console.log("SERVER RESPONSE:", error.response?.data);

      setErrorMessage(
        error.response?.data?.message ||
          "Failed to create ticket. Please try again."
      );
    }
  };

  return (
    <>
      {/* Navigation Bar */}
      <Navbar />

      {/* Create Ticket Page */}
      <div className="ticket-form-page">
        <div className="ticket-form-container">

          <div className="ticket-form-header">
            <h1>Create Ticket</h1>
            <p>Create a new customer support ticket.</p>
          </div>

          {errorMessage && (
            <div className="ticket-error">
              {errorMessage}
            </div>
          )}

          <form
            className="ticket-form"
            onSubmit={handleSubmit}
          >

            {/* Customer Name */}
            <div className="form-group">
              <label htmlFor="customerName">
                Customer Name
              </label>

              <input
                id="customerName"
                name="customerName"
                type="text"
                placeholder="Enter customer name"
                value={formData.customerName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Customer Email */}
            <div className="form-group">
              <label htmlFor="customerEmail">
                Customer Email
              </label>

              <input
                id="customerEmail"
                name="customerEmail"
                type="email"
                placeholder="Enter customer email"
                value={formData.customerEmail}
                onChange={handleChange}
                required
              />
            </div>

            {/* Subject */}
            <div className="form-group">
              <label htmlFor="subject">
                Subject
              </label>

              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="Enter ticket subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label htmlFor="description">
                Description
              </label>

              <textarea
                id="description"
                name="description"
                placeholder="Describe the customer's issue..."
                value={formData.description}
                onChange={handleChange}
                rows="6"
                required
              />
            </div>

            {/* Status */}
            <div className="form-group">
              <label htmlFor="status">
                Status
              </label>

              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Open">Open</option>
                <option value="In Progress">
                  In Progress
                </option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            <button
              className="submit-btn"
              type="submit"
            >
              Create Ticket
            </button>

          </form>
        </div>
      </div>
    </>
  );
}

export default CreateTicket;