'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // create column in answers
    return queryInterface.addColumn('Answers', 'created_by', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id',
      },
    });

    down: (queryInterface, Sequelize) => {
      // remove column in answers
      return queryInterface.removeColumn('Answers', 'created_by');
    };
  },
};
