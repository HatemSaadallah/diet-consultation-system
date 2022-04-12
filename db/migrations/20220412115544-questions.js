'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      person_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      question_title: {
        allowNull: false,
        type: Sequelize.DATE
      },
      question_description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      question_answers: {
        allowNull: false,
        type: Sequelize.JSON,
        defaultValue: '[]'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('questions');
  }
};
