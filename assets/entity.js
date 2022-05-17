const Sequelize = require('sequelize')
const sequelize = require('../utils/database')
const UserMod = require('../users/entity')
const User = UserMod(sequelize)

module.exports = (sequelize) => {
  const entity = sequelize.define('Assets', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: Sequelize.INTEGER,
      validate:{
        isAlphanumeric: true,
      }
    },
    type: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate:{
        isInt: true,
        notNull: true,
        min:1,
        max:3,
      }
    },
    level: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate:{
        isInt: true,
        notNull: true,
        min:1,
        max:10,
      }
    },
  })
  entity.belongsTo(User,{
    foreignKey: 'address'
  })
  return entity
}
