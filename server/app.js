const express = require("express");
const app = express();
app.get("/",(req,res)=>{
    res.send("support CRM backend is running");
})
module.exports =app;