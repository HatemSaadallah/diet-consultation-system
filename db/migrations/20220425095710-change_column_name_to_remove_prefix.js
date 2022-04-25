'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Answers', 'answer_recommendations', 'recommendations');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Answers', 'recommendations', 'answer_recommendations');
  }
};
