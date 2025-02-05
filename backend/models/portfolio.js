const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Portfolio = sequelize.define("Portfolio", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imageUrl: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: "image_url",
        },
        gallery: {
            type: DataTypes.JSON,
            defaultValue: [],
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        client: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        completionDate: {
            type: DataTypes.DATE,
            allowNull: false,
            field: "completion_date",
        },
        tags: {
            type: DataTypes.JSON,
            defaultValue: [],
        },
        orderNumber: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            field: "order_number",
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    });

    return Portfolio;
};
