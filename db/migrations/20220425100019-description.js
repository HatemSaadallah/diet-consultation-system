'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn(
      'Questions',
      'question_description',
      'description',
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn(
      'Questions',
      'description',
      'question_description',
    );
  },
};
