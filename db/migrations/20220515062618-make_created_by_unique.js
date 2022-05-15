'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.addConstraint('Answers', {
      type: 'unique',
      name: 'unique_answer',
      fields: ['created_by', 'is_draft', 'question_id'],
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeConstraint('Answers', 'unique_answer');
  },
};
