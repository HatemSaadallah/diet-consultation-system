'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Configure text values in Questions
    return queryInterface.changeColumn('Questions', 'person_name', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Anonymous',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Questions', 'person_name', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
