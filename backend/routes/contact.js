const express = require("express");
const router = express.Router();
const { Contact } = require("../connection");
const { sendAdminNotification } = require("../services/emailService");

// POST route to create new contact
router.post("/contact", async (req, res) => {
    try {
        const contact = await Contact.create(req.body);
        await sendAdminNotification(contact);
        res.status(201).json({
            success: true,
            data: contact,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
});

// GET route to fetch all contacts
router.get("/contact", async (req, res) => {
    try {
        const contacts = await Contact.findAll();
        res.status(200).json({
            success: true,
            data: contacts,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
});

// Get unread contact count
router.get("/contact/unread", async (req, res) => {
    try {
        const count = await Contact.count({
            where: { isRead: false },
        });
        res.status(200).json({
            success: true,
            count: count,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
});

// Mark contact as read
router.put("/contact/:id/read", async (req, res) => {
    try {
        await Contact.update(
            { isRead: true },
            { where: { id: req.params.id } }
        );
        res.status(200).json({
            success: true,
            message: "Contact marked as read",
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
});

module.exports = router;
