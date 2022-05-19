'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameTable('Consultants', 'Users');
    await queryInterface.addColumn('Users', 'type', {
      type: Sequelize.ENUM,
      values: ['patient', 'consultant', 'admin'],
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.removeColumn('Consultants', 'deleted_by');
    await queryInterface.removeColumn('Questions', 'deleted_by');
    await queryInterface.removeColumn('Questions', 'created_by');
    await queryInterface.removeColumn('Questions', 'updated_by');
    await queryInterface.removeColumn('Answers', 'deleted_by');
    await queryInterface.removeColumn('Answers', 'created_by');
    await queryInterface.removeColumn('Answers', 'updated_by');
  },
};
