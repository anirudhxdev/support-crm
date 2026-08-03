const express = require("express");
const ticketRoutes = require("./routes/ticketRoutes");
const app = express();
app.use(express.json());
app.get("/", (req,res)=>{
    res.send("Support CRM backend is running!");
});

app.use("/api/tickets",ticketRoutes);
module.exports = app;