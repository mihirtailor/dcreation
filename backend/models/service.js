const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Service = sequelize.define("Service", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        public_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        features: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        order_number: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    return Service;
};
