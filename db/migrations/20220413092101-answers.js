'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Create answers table
    return queryInterface.createTable('Answers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      question_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Questions',
          key: 'id'
        },
      },
      answer_title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      answer_description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      answer_recommendation: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
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
    return queryInterface.dropTable('Answers');
  }
};
