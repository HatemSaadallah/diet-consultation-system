'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Answers', 'created_by', {
        type: Sequelize.INTEGER,
        allowNull: false,
      }),
      queryInterface.changeColumn('Answers', 'updated_by', {
        type: Sequelize.INTEGER,
        allowNull: false,
      }),
      queryInterface.changeColumn('Answers', 'deleted_by', {
        type: Sequelize.INTEGER,
        allowNull: false,
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Answers', 'created_by', {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
      queryInterface.changeColumn('Answers', 'updated_by', {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
      queryInterface.changeColumn('Answers', 'deleted_by', {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
    ])
  }
};
