const { Category } = require("../connection");

const categoryController = {
    getAllCategories: async (req, res) => {
        try {
            const categories = await Category.findAll({
                order: [["order_number", "ASC"]],
            });
            res.json(categories);
        } catch (error) {
            res.status(500).json({
                message: "Error fetching categories",
                error,
            });
        }
    },

    createCategory: async (req, res) => {
        try {
            const category = await Category.create({
                name: req.body.name,
                icon: req.body.icon,
                description: req.body.description,
            });
            res.status(201).json(category);
        } catch (error) {
            res.status(500).json({ message: "Error creating category", error });
        }
    },

    updateCategory: async (req, res) => {
        try {
            const category = await Category.findByPk(req.params.id);
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }
            await category.update(req.body);
            res.json(category);
        } catch (error) {
            res.status(500).json({ message: "Error updating category", error });
        }
    },

    deleteCategory: async (req, res) => {
        try {
            const category = await Category.findByPk(req.params.id);
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }
            await category.destroy();
            res.json({ message: "Category deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting category", error });
        }
    },
};

module.exports = categoryController;
