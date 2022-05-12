'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Add column to Questions
    return queryInterface.addColumn('Questions', 'number_of_answers', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('Questions', 'number_of_answers');
  },
};
