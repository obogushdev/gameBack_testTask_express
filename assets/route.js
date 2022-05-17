const {Router} = require('express')
const Asset = require('./service')
const router = Router()

/**
 * @swagger
 * /asset:
 *     get:
 *       summary: Gets all assets
 *       tags:
 *         - Asset
 *       produces:
 *         - application/json
 *       responses:
 *         200:
 *           description: OK
 */
router.get('/', async (req, res) => {
  try {
    const asset = await Asset.findAll()
    res.status(200).json(asset)
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Server error'
    })
  }
})

/**
 * @swagger
 * /asset/{assetId}:
 *     get:
 *       summary: Gets an asset by ID.
 *       tags:
 *         - Asset
 *       parameters:
 *         - in: path
 *           name: assetId
 *           type: integer
 *           required: true
 *           description: Numeric ID of the asset to get.
 *       produces:
 *         - application/json
 *       responses:
 *         200:
 *           description: OK
 */
router.get('/:id', async (req, res) => {
  try {
    const asset = await Asset.findOne(+req.params.id)
    res.status(200).json(asset)
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Server error'
    })
  }
})

/**
 * @swagger
 * /asset:
 *     post:
 *       summary: Create new asset.
 *       tags:
 *         - Asset
 *       consumes:
 *         - application/json
 *       parameters:
 *         - in: body
 *           required: true
 *           name: asset
 *           description: The asset to create.
 *           schema:
 *             $ref: '#/definitions/Asset'     # <----------
 *       responses:
 *         201:
 *           description: OK
 * definitions:
 *   Asset:           # <----------
 *     type: object
 *     properties:
 *       type:
 *         type: integer
 *       level:
 *         type: integer
 *       address:
 *         type: string
 */
router.post('/', async (req, res) => {
  try {
    const {address, type, level} = req.body
    const asset = await Asset.create({
      address, type, level
    })
    res.status(201).json({asset})
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
 * /asset/{assetId}:
 *     put:
 *       summary: Update existing asset.
 *       tags:
 *         - Asset
 *       consumes:
 *         - application/json
 *       parameters:
 *         - in: path
 *           required: true
 *           name: assetId
 *           description: Numeric ID of the asset to update.
 *         - in: body
 *           required: true
 *           name: asset
 *           description: The asset to create.
 *           schema:
 *             $ref: '#/definitions/Asset'     # <----------
 *       responses:
 *         201:
 *           description: OK
 * definitions:
 *   Asset:           # <----------
 *     type: object
 *     properties:
 *       type:
 *         type: integer
 *       level:
 *         type: integer
 *       address:
 *         type: string
 */
router.put('/:id', async (req, res) => {

  try {
    const {address, type, level} = req.body
    const asset = await Asset.update(+req.params.id, {address, type, level})
    res.status(200).json({asset})
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
 * /asset/{assetId}:
 *     delete:
 *       summary: Delete existing asset.
 *       tags:
 *         - Asset
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: path
 *           required: true
 *           name: assetId
 *           description: Numeric ID of the asset to delete.
 */
router.delete('/:id', async (req, res) => {
  try {
    await Asset.delete(+req.params.id)
    res.status(204).json({})
  } catch (e) {
    console.log(e)
    console.log(e)
    res.status(500).json({
      message: 'Server error'
    })
  }
})

module.exports = router