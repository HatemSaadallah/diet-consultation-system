'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Create enum wether in User Table wether patient or consultant
    
    return queryInterface.addColumn('Users', 'role', {
      type: Sequelize.ENUM,
      values: ['patient', 'consultant'],
      allowNull: false,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'role');
  }
};