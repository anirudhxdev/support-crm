const Ticket = require("../models/Ticket");
const createTicket = async(req,res) =>{
    console.log(req.body);
    try{
        const ticket = await Ticket.create(req.body);
        res.status(201).json({
            success: true,
            message: "Ticket created successfully",
            data: ticket,
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}; 
const getAllTicket = async(req,res) =>{
    try{
        const tickets = await Ticket.find();
        res.status(200).json({
            success:true,
            count: tickets.length,
            data:tickets,
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
module.exports = {
    createTicket,
    getAllTicket,
};