import { useEffect, useState } from "react";
import api from "../services/api";

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
        <div>
            <h1>Dashboard</h1>

            {stats && (
                <div>
                    <p> Total Tickets : {stats.total}</p>
                    <p> Open: {stats.open}</p>
                    <p> In progress: {stats.inProgress}</p>
                    <p> Close: {stats.closed}</p>
                </div>
            )}
        </div>
    );
}

export default Dashboard;