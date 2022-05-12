'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Delete Column
    return queryInterface.removeColumn('Questions', 'person_name');
  },

  down: (queryInterface, Sequelize) => {
    // Add Column
    return queryInterface.addColumn('Questions', 'person_name', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
    });
  },
};
