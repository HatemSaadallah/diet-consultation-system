'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      person_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      question_title: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      question_description: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      question_answers: {
        allowNull: false,
        type: Sequelize.JSON,
        defaultValue: '[]',
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Questions');
  },
};
