module.exports = {
  up: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      timestamp: {
        allowNull: false,
        type: Sequelize.BIGINT,
        validate: {
          min: 0,
          isInt: {
            msg: 'Timestamp should be an integer',
          },
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  down: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.dropTable('Events')
  }
}
