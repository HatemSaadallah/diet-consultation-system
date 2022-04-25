'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Change col data type
    return queryInterface.changeColumn('Answers', 'created_by', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Answers', 'created_by', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  }
};
