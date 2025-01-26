const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Contact = sequelize.define("Contact", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        phone: {
            type: DataTypes.STRING,
            validate: {
                len: [10, 10],
            },
        },
        company: {
            type: DataTypes.STRING,
        },
        service: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        isRead: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    });
    return Contact;
};
