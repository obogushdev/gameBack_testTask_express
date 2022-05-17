const {Router} = require('express')
const Product = require('./service')
const router = Router()

/**
 * @swagger
 * /product:
 *     get:
 *       summary: Gets all products
 *       tags:
 *         - Product
 *       produces:
 *         - application/json
 *       responses:
 *         200:
 *           description: OK
 */
router.get('/', async (req, res) => {
  try {
    const catalog = await Product.findAll()
    res.status(200).json(catalog)
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Server error'
    })
  }
})

/**
 * @swagger
 * /product/{productId}:
 *     get:
 *       summary: Gets a product by ID.
 *       tags:
 *         - Product
 *       parameters:
 *         - in: path
 *           name: productId
 *           type: integer
 *           required: true
 *           description: Numeric ID of the product to get.
 *       produces:
 *         - application/json
 *       responses:
 *         200:
 *           description: OK
 */
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne(+req.params.id)
    res.status(200).json(product)
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Server error'
    })
  }
})

/**
 * @swagger
 * /product:
 *     post:
 *       summary: Create new product.
 *       tags:
 *         - Product
 *       consumes:
 *         - application/json
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: body
 *           required: true
 *           name: product
 *           description: The product to create.
 *           schema:
 *             $ref: '#/definitions/Product'     # <----------
 *       responses:
 *         201:
 *           description: OK
 * definitions:
 *   Product:           # <----------
 *     type: object
 *     properties:
 *       address:
 *         type: string
 */
router.post('/', async (req, res) => {
  try {
    const {address} = req.body
    const product = await Product.create({
      address
    })
    res.status(201).json({product})
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Server error',
      error: e
    })
  }
})

/**
 * @swagger
 * /product/{productId}:
 *     put:
 *       summary: Update existing product.
 *       tags:
 *         - Product
 *       consumes:
 *         - application/json
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: path
 *           required: true
 *           name: productId
 *           description: Numeric ID of the product to update.
 *         - in: body
 *           required: true
 *           name: product
 *           description: The product to update.
 *           schema:
 *             $ref: '#/definitions/Product'     # <----------
 *       responses:
 *         201:
 *           description: OK
 * definitions:
 *   Product:           # <----------
 *     type: object
 *     properties:
 *       address:
 *         type: string
 */
router.put('/:id', async (req, res) => {

  try {
    const {address} = req.body
    const product = await Product.update(+req.params.id, {
      address
    })
    res.status(200).json({product})
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Server error',
      error: e
    })
  }
})

/**
 * @swagger
 * /product/{productId}:
 *     delete:
 *       summary: Delete existing product.
 *       tags:
 *         - Product
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: path
 *           required: true
 *           name: productId
 *           description: Numeric ID of the product to delete.
 */
router.delete('/:id', async (req, res) => {
  try {
    await Product.delete(+req.params.id)
    res.status(204).json({})
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Server error'
    })
  }
})

/**
 * @swagger
 * /product/buyProduct:
 *     post:
 *       summary: Performing buyProduct operation.
 *       tags:
 *         - Product
 *       produces:
 *         - application/json
 *       consumes:
 *         - application/json
 *       parameters:
 *         - in: body
 *           required: true
 *           name: buyProductSchema
 *           schema:
 *             $ref: '#/definitions/buyProduct'     # <----------
 *       responses:
 *         201:
 *           description: OK
 * definitions:
 *   buyProduct:           # <----------
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *         description: Catalog id
 *       address:
 *         type: string
 *         description: User address
 */
router.post('/buyProduct', async (req, res) => {
  const { id, address } = req.body
  const result = await Product.buyProduct(+id, address)
  res.status(200).json({result})
})

module.exports = router