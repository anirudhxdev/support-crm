const Ticket = require("../models/Ticket");
const createTicket = async (req, res) => {
  console.log("BODY:", req.body);

  try {
    const lastTicket = await Ticket.findOne({
      ticketId: { $regex: /^TKT-\d+$/ }
    }).sort({ ticketId: -1 });

    let nextNumber = 1001;

    if (lastTicket) {
      const lastNumber = parseInt(
        lastTicket.ticketId.replace("TKT-", ""),
        10
      );

      nextNumber = lastNumber + 1;
    }

    const ticketId = `TKT-${nextNumber}`;

    const ticket = await Ticket.create({
      ...req.body,
      ticketId,
    });

    res.status(201).json({
      success: true,
      message: "Ticket created successfully",
      data: ticket,
    });

  } catch (error) {
    console.log("CREATE TICKET ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getAllTickets = async(req,res) =>{
    try{
        const filter = {};
        if(req.query.status) {
            filter.status = req.query.status;
        }
        if(req.query.search) {
            filter.$or = [
                {
                    customerName :{
                        $regex : req.query.search,
                        $options : "i",
                    },
                },
                {
                    subject:{
                        $regex: req.query.search,
                        $options: "i",
                    },
                },
            ];
        }
        const tickets = await Ticket.find(filter);
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
const getTicketById = async (req,res) => {
   try{

   const ticket = await Ticket.findById(req.params.id);
    if(!ticket){
        return res.status(404).json({
            success:false,
            message:"Ticket not found",
        });
    }

    res.status(200).json({
        success:true,
        data:ticket,
    });
 } catch(error){
    res.status(500).json({
        success: false,
        message : error.message,
    });
 };
}

const updateTicket = async (req,res) => {
    try{
        const ticket = await Ticket.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if(!ticket){
            return  res.status(404).json({
                success: false,
                message : "Ticket not found",
            });
        }
        res.status(200).json({
            success: true,
            message:"Ticket updated successfully",
            data: ticket,
        })
    } catch(error){
        res.status(500).json({
            success : false,
            message : error.message,
        });
    }
};
const deleteTicket = async (req, res) => {
   try{
     const ticket = await Ticket.findByIdAndUpdate(req.params.id);

     if(!ticket){
        return res.status(404).json({
            success : false,
            message: "Ticket not found",
        });
     }
     res.status(200).json({
        success: true,
        message:"Ticket deleted successfully",
     });
   }catch(error){
    res.status(500).json({
        success: false,
        message : error.message,
    });
   }
};
const getTicketStats = async (req,res) => {
    try {

        const total = await Ticket.countDocuments();

        const open = await Ticket.countDocuments({status : "Open"});

        const inProgress = await Ticket.countDocuments({
            status: "In progress",
        });

        const closed =await Ticket.countDocuments({
            status:"Closed",
        });

        res.status(200).json({
            success : true,
            data :{
                total,
                open,
                inProgress,
                closed,
            },
        });
    } catch(error){
        res.status(500).json({
            success : false,
            message : error.message,
        });
    }
};
module.exports = {
    createTicket,
    getAllTickets,
    getTicketById,
    updateTicket,
    deleteTicket,
    getTicketStats,
};