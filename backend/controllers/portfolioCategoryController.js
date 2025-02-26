const { PortfolioCategory } = require("../connection");

const portfolioCategoryController = {
    getAllCategories: async (req, res) => {
        try {
            const categories = await PortfolioCategory.findAll({
                order: [["order_number", "ASC"]],
            });
            res.json(categories);
        } catch (error) {
            res.status(500).json({
                message: "Error fetching portfolio categories",
                error,
            });
        }
    },

    createCategory: async (req, res) => {
        try {
            const category = await PortfolioCategory.create({
                name: req.body.name,
                icon: req.body.icon,
                description: req.body.description,
            });
            res.status(201).json(category);
        } catch (error) {
            res.status(500).json({ message: "Error creating portfolio category", error });
        }
    },

    updateCategory: async (req, res) => {
        try {
            const category = await PortfolioCategory.findByPk(req.params.id);
            if (!category) {
                return res.status(404).json({ message: "Portfolio category not found" });
            }
            await category.update(req.body);
            res.json(category);
        } catch (error) {
            res.status(500).json({ message: "Error updating portfolio category", error });
        }
    },

    deleteCategory: async (req, res) => {
        try {
            const category = await PortfolioCategory.findByPk(req.params.id);
            if (!category) {
                return res.status(404).json({ message: "Portfolio category not found" });
            }
            await category.destroy();
            res.json({ message: "Portfolio category deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting portfolio category", error });
        }
    },
};

module.exports = portfolioCategoryController;
