'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // consultant ID & is_draft & question ID are compisitely unique
    return queryInterface.addConstraint('Answers', {
      type: 'unique',
      name: 'unique_answer',
      fields: ['consultant_id', 'is_draft', 'question_id'],
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Answers', 'unique_answer');
  },
};
