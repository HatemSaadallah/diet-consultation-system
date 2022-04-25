'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Add default value for deleted by
    return Promise.all([
      queryInterface.changeColumn('Answers', 'deleted_by', {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
      queryInterface.changeColumn('Answers', 'updated_by', {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    // Remove default value for deleted by
    return Promise.all([
      queryInterface.changeColumn('Answers', 'deleted_by', {
        type: Sequelize.INTEGER,
        allowNull: false,
      }),
      queryInterface.changeColumn('Answers', 'updated_by', {
        type: Sequelize.INTEGER,
        allowNull: false,
      }),
    ]);
  }
};
