'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Delete column form Users table
    return queryInterface.removeColumn('Users', 'password');
  },

  down: (queryInterface, Sequelize) => {
    // Add column to Users table
    return queryInterface.addColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
    });
  },
};
