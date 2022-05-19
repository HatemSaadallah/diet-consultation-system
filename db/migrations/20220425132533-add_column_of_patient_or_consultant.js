'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Create enum wether in User Table wether patient or consultant

    return queryInterface.addColumn('Users', 'role', {
      type: Sequelize.ENUM,
      values: ['patient', 'consultant', 'admin'],
      allowNull: false,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('Users', 'role');
  },
};
