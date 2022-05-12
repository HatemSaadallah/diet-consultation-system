'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Change answer_recommendation column name
    return queryInterface.renameColumn(
      'Answers',
      'answer_recommendation',
      'answer_recommendations',
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn(
      'Answers',
      'answer_recommendations',
      'answer_recommendation',
    );
  },
};
