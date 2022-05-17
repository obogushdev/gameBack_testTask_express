const Sequelize = require('sequelize')
const sequelize = require('../utils/database')
const UserMod = require('../users/entity')
const User = UserMod(sequelize)

module.exports = (sequelize) => {
  const entity = sequelize.define('Products', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: Sequelize.INTEGER
    },
  })
  entity.belongsTo(User,{
    foreignKey: 'address'
  })
  return entity
}