'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Change Table Name
    return queryInterface.renameTable('Consultants', 'Users');
  },

  down: (queryInterface, Sequelize) => {
    // Change Table Name
    return queryInterface.renameTable('Users', 'Consultants');
  },
};
