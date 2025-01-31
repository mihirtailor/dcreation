const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Category = sequelize.define("Category", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        icon: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        order_number: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    });

    return Category;
};
