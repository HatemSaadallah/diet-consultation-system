'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // remove column
    return queryInterface.removeColumn('Answers', 'consultant_id');
  },

  down: (queryInterface, Sequelize) => {
    // add column
    return queryInterface.addColumn('Answers', 'consultant_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    });
  },
};
