'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.removeColumn('Questions', 'question_answers');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Questions', 'question_answers', {
      type: Sequelize.TEXT,
      allowNull: false,
    });
  },
};
