module.exports = (sequelize: any, DataTypes: any) => {
  const events = sequelize.define(
    'events',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [3, 20],
            msg: 'Name length should be between 3 and 20'
          },
          notNull: {
            msg: "Name can't be a null"
          },
        }
      },
      timestamp: {
        allowNull: false,
        type: DataTypes.BIGINT,
        validate: {
          notNull: {
            msg: "Timestamp can't be a null"
          },
          min: 0,
          isNumeric: {
            msg: 'Timestamp must be an integer'
          }
        },
      },
    },
    {
      indexes: [
        {
          unique: false,
          fields: ['timestamp'],
        },
      ],
    }
  )

  return events
}
