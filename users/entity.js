const Sequelize = require('sequelize')

module.exports = (sequelize) => {
  const entity = sequelize.define('Users', {
    address: {
      primaryKey: true,
      autoIncrement: false,
      allowNull: false,
      type: Sequelize.STRING
    },
    cash1: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        isInt: true,
      }
    },
    cash2: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        isInt: true,
      }
    },
    cash3: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        isInt: true,
      }
    },
  })
  return entity
}
