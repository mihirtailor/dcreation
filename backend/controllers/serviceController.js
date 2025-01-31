const { Service } = require("../connection");
const cloudinary = require("../config/cloudinary");

const serviceController = {
    // Get all services with their categories
    getAllServices: async (req, res) => {
        try {
            const services = await Service.findAll();
            res.json(services);
        } catch (error) {
            res.status(500).json({ message: "Error fetching services", error });
        }
    },

    // Create new service
    createService: async (req, res) => {
        try {
            const result = await cloudinary.uploader.upload(
                req.files.image.tempFilePath,
                {
                    folder: "services",
                }
            );

            const service = await Service.create({
                name: req.body.name,
                description: req.body.description,
                image_url: result.secure_url,
                public_id: result.public_id,
                price: req.body.price,
                features: JSON.parse(req.body.features),
                categoryId: req.body.categoryId,
            });

            res.status(201).json(service);
        } catch (error) {
            res.status(500).json({ message: "Error creating service", error });
        }
    },

    // Update service
    updateService: async (req, res) => {
        try {
            const service = await Service.findByPk(req.params.id);
            if (!service) {
                return res.status(404).json({ message: "Service not found" });
            }

            await service.update(req.body);
            res.json(service);
        } catch (error) {
            res.status(500).json({ message: "Error updating service", error });
        }
    },

    // Delete service
    deleteService: async (req, res) => {
        try {
            const service = await Service.findByPk(req.params.id);
            if (!service) {
                return res.status(404).json({ message: "Service not found" });
            }

            await cloudinary.uploader.destroy(service.public_id);
            await service.destroy();
            res.json({ message: "Service deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting service", error });
        }
    },
};

module.exports = serviceController;
