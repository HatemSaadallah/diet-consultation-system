'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Answers', 'answer_description', 'description');

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Answers', 'description', 'answer_description');
  }
};
