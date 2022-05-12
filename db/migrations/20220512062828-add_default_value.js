'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Change column to allow null values
    return queryInterface.changeColumn('Questions', 'created_by', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  down: (queryInterface, Sequelize) => {
    // Change column to allow null values
    return queryInterface.changeColumn('Questions', 'created_by', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
};
