'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Add default value for deleted by
    return queryInterface.changeColumn('Answers', 'deleted_by', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

  },

  down: (queryInterface, Sequelize) => {
    // Remove default value for deleted by
    return queryInterface.changeColumn('Answers', 'deleted_by', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  }
};
