const express = require('express')
const path = require('path')
const sequelize = require('./utils/database')
const userRoutes = require('./users/route')
const assetRoutes = require('./assets/route')
const catalogRoutes = require('./catalogs/route')
const productRoutes = require('./products/route')
const initRoutes = require('./routes/init')

const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUI = require("swagger-ui-express")

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use('/user', userRoutes)
app.use('/asset', assetRoutes)
app.use('/catalog', catalogRoutes)
app.use('/product', productRoutes)
app.use('/', initRoutes)

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Library API",
      version: '1.0.0',
    },
  },
  apis: [
      "./routes/*.js",
      "./assets/*.js",
      "./catalogs/*.js",
      "./products/*.js",
      "./users/*.js",
  ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/swagger-api', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


async function start() {
  try {
    await sequelize.sync()
    app.listen(PORT)
  } catch (e) {
    console.log(e)
  }
}

start()