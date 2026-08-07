import { useEffect, useState } from "react";
import api from "../services/api";

function Tickets(){
    const [tickets, setTickets] =  useState([]);

    useEffect(() => {
        const fetchtickets = async () =>{
            try{
                const response = await api.get("/tickets");

                console.log("TICKETS:" , response.data);

                setTickets(response.data.data);
            }catch(error){
                console.log("TICKETS ERROR:" , error);
            }
        };
        fetchtickets();
   },[]);

   return(
    <div>
        <h1>Tickets</h1>

        {tickets.map((ticket) =>(
            <div key={ticket._id}>

                <h3>{ticket.ticketId}</h3>

                <p>Customer : {ticket.customerName}</p>

                <p>Subject:{ticket.subject}</p>

                <p>Status: {ticket.status}</p>

                <hr/>            
                            
                </div>
        ))}
    </div>
   );
}

export default Tickets;