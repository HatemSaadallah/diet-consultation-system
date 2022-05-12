'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Change column to allow null values
    return queryInterface.changeColumn('Questions', 'updated_by', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    // Change column to allow null values
    return queryInterface.changeColumn('Questions', 'updated_by', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};
