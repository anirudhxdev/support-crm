import api from "../services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateTicket(){
     
    const navigate = useNavigate();
    const [formData , setFormData] = useState({
        customerName:"",
        customerEmail:"",
        subject:"",
        description:""
    });

    const handleSubmit = async (e) => {
      e.preventDefault();

  try {
    const response = await api.post("/tickets", formData);
     
    console.log("CREATE TICKET:", response.data);

    
    setFormData({
     customerName: "",
     customerEmail: "",
     subject: "",
     description: "",
    });
    navigate("/tickets", {
  state: {
    successMessage: "Ticket created successfully!",
  },
});
   } catch (error) {
  console.log("CREATE TICKET ERROR:", error);
  console.log("SERVER RESPONSE:", error.response?.data);
}
};
    return(
        <div>
        <h1> Create Ticket</h1>
      
        <form onSubmit={handleSubmit}>

            <div>
                <label>Customer Name:</label>
                <input type="text"
                value={formData.customerName}
                onChange={(e) =>
                setFormData ({
                    ...formData,
                    customerName: e.target.value,
                })
            }
            />
            </div>

            <div>
                <label>Customer Email:</label>
                <input type="email"
                value={formData.customerEmail}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                    customerEmail: e.target.value,
                    })
                }
                />
            </div>

            <div>
                <label>Subject:</label>
                <input type="text"
                value={formData.subject}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        subject: e.target.value,
                    })
                }
                />
            </div>

            <div>
                <label>Description:</label>
                <textarea
                value={formData.description}
                onChange={(e) =>
                 setFormData({
                    ...formData,
                    description: e.target.value,
                 })
                }
                />
            </div>

            <button type="submit">
                Create Ticket
            </button>
        </form>
    </div>
    );
}
export default CreateTicket;