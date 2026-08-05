const express = require("express");
const {
    createTicket,
    getAllTickets,
    getTicketById,
    updateTicket,
    deleteTicket,
} = require("../controllers/ticketController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createTicket);
router.get("/", protect, getAllTickets);
router.get("/:id", protect, getTicketById);
router.put("/:id", protect, updateTicket);
router.delete("/:id", protect, deleteTicket);

module.exports = router;