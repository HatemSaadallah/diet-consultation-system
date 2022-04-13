'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // change data type of column 
    return queryInterface.changeColumn('Questions', 'question_title', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Questions', 'question_title', {
      type: Sequelize.DATE,
      allowNull: false
    });
  }
};
