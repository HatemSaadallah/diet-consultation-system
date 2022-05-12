'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Add column to Answers
    return queryInterface.addColumn('Answers', 'consultant_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Consultants',
        key: 'id',
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Answers', 'consultant_id');
  },
};
