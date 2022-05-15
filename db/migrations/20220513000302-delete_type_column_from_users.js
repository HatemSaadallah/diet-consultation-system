'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Delete Column from User
    return queryInterface.removeColumn('Users', 'type');
  },

  down: (queryInterface, Sequelize) => {
    // Add Column to User
    return queryInterface.addColumn('Users', 'type', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'patient',
    });
  },
};
