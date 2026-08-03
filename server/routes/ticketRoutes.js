const express = require("express");
const { createTicket ,
    getAllTickets,
    getTicketById,
    updateTicket,
} = require("../controllers/ticketController");

const router = express.Router();


router.post("/", createTicket);
router.get("/", getAllTickets);
router.get("/:id", getTicketById);
router.put("/:id" , updateTicket)

module.exports = router;