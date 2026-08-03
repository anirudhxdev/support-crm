const express = require("express");
const { createTicket ,
    getAllTickets,
    getTicketById,
} = require("../controllers/ticketController");

const router = express.Router();

router.post("/", createTicket);
router.get("/", getAllTickets);
router.get("/:id", getTicketById);

module.exports = router;