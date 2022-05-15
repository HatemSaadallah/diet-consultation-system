'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Answers', 'is_draft', {
      type: Sequelize.DATE,
      allowNull: false,
      // Zero date means it's a draft
      defaultValue: new Date(0),
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('Answers', 'is_draft');
  },
};
