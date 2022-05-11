'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Answers', 'created_by', {
        type: Sequelize.INTEGER,
        allowNull: false,
      }),
      // create column in answers
      queryInterface.addColumn('Answers', 'updated_by', {
        type: Sequelize.INTEGER,
        allowNull: false,
      }),
      queryInterface.addColumn('Answers', 'deleted_by', {
        type: Sequelize.INTEGER,
        allowNull: false,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Answers', 'created_by', {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
      queryInterface.removeColumn('Answers', 'updated_by'),
      queryInterface.removeColumn('Answers', 'deleted_by'),
    ]);
  },
};
