'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameTable('Consultants', 'Users');
    // await queryInterface.renameColumn('Answers', 'consultant_id', 'user_id');
    // await queryInterface.renameColumn('Users', 'consultant_id', 'user_id');
    // await queryInterface.renameColumn('Users', 'role', 'type');
    await queryInterface.addColumn('Users', 'type', {
      type: Sequelize.ENUM,
      values: ['patient', 'consultant'],
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
