const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const portfolioController = require("../controllers/portfolioController");

// Configure fileUpload middleware with multiple file support
const uploadMiddleware = fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    createParentPath: true,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB max file size
        files: 10, // Allow up to 10 files to be uploaded at once
    },
});

// Portfolio routes
router.get("/portfolios", portfolioController.getAllPortfolios);
router.post(
    "/portfolios",
    uploadMiddleware,
    portfolioController.createPortfolio
);
router.put(
    "/portfolios/:id",
    uploadMiddleware,
    portfolioController.updatePortfolio
);
router.delete("/portfolios/:id", portfolioController.deletePortfolio);

module.exports = router;
