'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // add created_by
    return Promise.all([
      queryInterface.addColumn('Questions', 'created_by', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      }),
      queryInterface.addColumn('Questions', 'updated_by', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      }),
      queryInterface.addColumn('Questions', 'deleted_by', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id',
        },
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    // remove created_by
    return Promise.all([
      queryInterface.removeColumn('Questions', 'created_by'),
      queryInterface.removeColumn('Questions', 'updated_by'),
      queryInterface.removeColumn('Questions', 'deleted_by'),
    ]);
  },
};
