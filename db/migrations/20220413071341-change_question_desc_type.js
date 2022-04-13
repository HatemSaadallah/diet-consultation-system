'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // change data type of column 
    return queryInterface.changeColumn('Questions', 'question_description', {
      // change type to longtext
      type: Sequelize.TEXT,
      allowNull: false
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Questions', 'question_description', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};
