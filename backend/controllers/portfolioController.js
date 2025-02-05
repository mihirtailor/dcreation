const { Portfolio } = require("../connection");
const cloudinary = require("../config/cloudinary");

const portfolioController = {
    getAllPortfolios: async (req, res) => {
        try {
            const portfolios = await Portfolio.findAll({
                order: [["order_number", "ASC"]],
            });
            res.json(portfolios);
        } catch (error) {
            res.status(500).json({
                message: "Error fetching portfolios",
                error,
            });
        }
    },

    createPortfolio: async (req, res) => {
        try {
            // Upload main image
            const mainImageResult = await cloudinary.uploader.upload(
                req.files.image.tempFilePath,
                {
                    folder: "portfolios",
                }
            );

            // Handle gallery images
            let galleryUrls = [];
            if (req.files.gallery) {
                const galleryFiles = Array.isArray(req.files.gallery)
                    ? req.files.gallery
                    : [req.files.gallery];

                for (const file of galleryFiles) {
                    const result = await cloudinary.uploader.upload(
                        file.tempFilePath,
                        {
                            folder: "portfolios/gallery",
                        }
                    );
                    galleryUrls.push(result.secure_url);
                }
            }

            const portfolio = await Portfolio.create({
                title: req.body.title,
                category: req.body.category,
                imageUrl: mainImageResult.secure_url,
                public_id: mainImageResult.public_id,
                description: req.body.description,
                client: req.body.client,
                completionDate: req.body.completionDate,
                tags: JSON.parse(req.body.tags),
                gallery: galleryUrls,
            });

            res.status(201).json(portfolio);
        } catch (error) {
            console.log("Error details:", error);
            res.status(500).json({
                message: "Error creating portfolio",
                error,
            });
        }
    },
    updatePortfolio: async (req, res) => {
        try {
            const portfolio = await Portfolio.findByPk(req.params.id);
            if (!portfolio) {
                return res.status(404).json({ message: "Portfolio not found" });
            }

            const updateData = { ...req.body };

            // Handle main image update
            if (req.files && req.files.image) {
                const result = await cloudinary.uploader.upload(
                    req.files.image.tempFilePath,
                    {
                        folder: "portfolios",
                    }
                );
                updateData.image_url = result.secure_url;
                updateData.public_id = result.public_id;

                if (portfolio.public_id) {
                    await cloudinary.uploader.destroy(portfolio.public_id);
                }
            }

            // Handle gallery images update
            if (req.files && req.files.gallery) {
                let galleryUrls = [];
                const galleryFiles = Array.isArray(req.files.gallery)
                    ? req.files.gallery
                    : [req.files.gallery];

                for (const file of galleryFiles) {
                    const result = await cloudinary.uploader.upload(
                        file.tempFilePath,
                        {
                            folder: "portfolios/gallery",
                        }
                    );
                    galleryUrls.push(result.secure_url);
                }
                updateData.gallery = galleryUrls;
            }

            if (updateData.tags) {
                updateData.tags = JSON.parse(updateData.tags);
            }

            await portfolio.update(updateData);
            res.json(portfolio);
        } catch (error) {
            res.status(500).json({
                message: "Error updating portfolio",
                error,
            });
        }
    },
    deletePortfolio: async (req, res) => {
        try {
            const portfolio = await Portfolio.findByPk(req.params.id);
            if (!portfolio) {
                return res.status(404).json({ message: "Portfolio not found" });
            }

            if (portfolio.public_id) {
                await cloudinary.uploader.destroy(portfolio.public_id);
            }

            await portfolio.destroy();
            res.json({ message: "Portfolio deleted successfully" });
        } catch (error) {
            res.status(500).json({
                message: "Error deleting portfolio",
                error,
            });
        }
    },
};

module.exports = portfolioController;
