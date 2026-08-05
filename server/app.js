
const express = require("express");
const ticketRoutes = require("./routes/ticketRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();
app.use(express.json());
app.use("/api/tickets",ticketRoutes);
app.use("/api/auth", authRoutes);
module.exports = app;