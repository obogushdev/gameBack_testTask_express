
const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const entity = sequelize.define('Catalog', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.INTEGER
  },
  name: {
    type:Sequelize.STRING,
    validate:{
      isAlphanumeric: true,
    }
  },
  description: {
    type:Sequelize.STRING,
    validate:{
      isAlphanumeric: true,
    }
  },
  url: {
    type:Sequelize.STRING,
    allowNull: false,
    validate:{
      notNull: true,
    }
  },
  cost1: {
    type:Sequelize.INTEGER,
    allowNull: false,
    validate:{
      notNull: true,
      isInt: true,
    }
  },
  cost2: {
    type:Sequelize.INTEGER,
    allowNull: false,
    validate:{
      notNull: true,
      isInt: true,
    }
  },
  cost3: {
    type:Sequelize.INTEGER,
    allowNull: false,
    validate:{
      notNull: true,
      isInt: true,
    }
  },
  req1: {
    type:Sequelize.INTEGER,
    allowNull: false,
    validate:{
      notNull: true,
      isInt: true,
      min:1,
      max:10,
    }
  },
  req2: {
    type:Sequelize.INTEGER,
    allowNull: false,
    validate:{
      notNull: true,
      isInt: true,
      min:1,
      max:10,
    }
  },
  req3: {
    type:Sequelize.INTEGER,
    allowNull: false,
    validate:{
      notNull: true,
      isInt: true,
      min:1,
      max:10,
    }
  },
  category: {
    type:Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notNull: true,
      isInt: true,
    }
  },
})

module.exports = entity
