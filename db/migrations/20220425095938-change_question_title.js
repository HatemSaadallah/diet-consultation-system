'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Questions', 'question_title', 'title');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Questions', 'title', 'question_title');
  }
};
