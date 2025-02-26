const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const PortfolioCategory = sequelize.define("PortfolioCategory", {
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

    return PortfolioCategory;
};
