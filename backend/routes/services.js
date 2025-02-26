const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const serviceController = require("../controllers/serviceController");
const categoryController = require("../controllers/categoryController");

// Configure fileUpload middleware
const uploadMiddleware = fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
});

// Routes
router.get("/services", serviceController.getAllServices);
router.post("/services", uploadMiddleware, serviceController.createService);
router.put("/services/:id", uploadMiddleware, serviceController.updateService);
router.delete("/services/:id", serviceController.deleteService);

// Category routes
router.get("/service-categories", categoryController.getAllCategories);
router.post("/service-categories", categoryController.createCategory);
router.put("/service-categories/:id", categoryController.updateCategory);
router.delete("/service-categories/:id", categoryController.deleteCategory);

module.exports = router;
