'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'Luis Angel',
        email: 'luisangel@example.com',
        age: 25,
        comments: 'Usuario de prueba',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ana Gomez',
        email: 'ana.gomez@example.com',
        age: 30,
        comments: 'Otra usuaria de prueba',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
