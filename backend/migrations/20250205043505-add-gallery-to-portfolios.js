"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn("Portfolios", "gallery", {
            type: Sequelize.JSON,
            allowNull: true,
            defaultValue: [],
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn("Portfolios", "gallery");
    },
};
