'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Change column name in answers table
    return queryInterface.renameColumn('Answers', 'answer_title', 'title');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Answers', 'title', 'answer_title');
  },
};
