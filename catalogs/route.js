const {Router} = require('express')
const Catalog = require('./service')
const router = Router()

/**
 * @swagger
 * /catalog:
 *     get:
 *       summary: Gets all catalogs
 *       tags:
 *         - Catalog
 *       produces:
 *         - application/json
 *       responses:
 *         200:
 *           description: OK
 */
router.get('/', async (req, res) => {
  try {
    const catalog = await Catalog.findAllConverted()
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
 * /catalog/{catalogId}:
 *     get:
 *       summary: Gets a catalog by ID.
 *       tags:
 *         - Catalog
 *       parameters:
 *         - in: path
 *           name: catalogId
 *           type: integer
 *           required: true
 *           description: Numeric ID of the catalog to get.
 *       produces:
 *         - application/json
 *       responses:
 *         200:
 *           description: OK
 */
router.get('/:id', async (req, res) => {
  try {
    const catalog = await Catalog.findOneConverted(+req.params.id)
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
 * /catalog:
 *     post:
 *       summary: Create new catalog row.
 *       tags:
 *         - Catalog
 *       consumes:
 *         - application/json
 *       parameters:
 *         - in: body
 *           required: true
 *           name: catalog
 *           description: The catalog item to create.
 *           schema:
 *             $ref: '#/definitions/Catalog'     # <----------
 *       responses:
 *         201:
 *           description: OK
 * definitions:
 *   Catalog:           # <----------
 *     type: object
 *     properties:
 *       type:
 *         name: string
 *       description:
 *         type: string
 *       url:
 *         type: string
 *       cost1:
 *         type: integer
 *       cost2:
 *         type: integer
 *       cost3:
 *         type: integer
 *       req1:
 *         type: integer
 *       req2:
 *         type: integer
 *       req3:
 *         type: integer
 *       category:
 *         type: integer
 */
router.post('/', async (req, res) => {
  try {
    const {name, description, url, cost1, cost2, cost3, req1, req2, req3, category} = req.body
    const catalog = await Catalog.create({
      name, description, url, cost1, cost2, cost3, req1, req2, req3, category
    })
    res.status(201).json({catalog})
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
 * /catalog/{catalogId}:
 *     put:
 *       summary: Create new catalog row.
 *       tags:
 *         - Catalog
 *       consumes:
 *         - application/json
 *       parameters:
 *         - in: path
 *           required: true
 *           name: catalogId
 *           description: Numeric ID of the catalog to update.
 *         - in: body
 *           required: true
 *           name: catalog
 *           description: The catalog item to create.
 *           schema:
 *             $ref: '#/definitions/Catalog'     # <----------
 *       responses:
 *         201:
 *           description: OK
 * definitions:
 *   Catalog:           # <----------
 *     type: object
 *     properties:
 *       type:
 *         name: string
 *       description:
 *         type: string
 *       url:
 *         type: string
 *       cost1:
 *         type: integer
 *       cost2:
 *         type: integer
 *       cost3:
 *         type: integer
 *       req1:
 *         type: integer
 *       req2:
 *         type: integer
 *       req3:
 *         type: integer
 *       category:
 *         type: integer
 */
router.put('/:id', async (req, res) => {

  try {

    const {name, description, url, cost1, cost2, cost3, req1, req2, req3, category} = req.body
    const catalog = await Catalog.update(+req.params.id, {name, description, url, cost1, cost2, cost3, req1, req2, req3, category})
    res.status(200).json({catalog})

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
 * /catalog/{catalogId}:
 *     delete:
 *       summary: Delete catalog row.
 *       tags:
 *         - Catalog
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: path
 *           required: true
 *           name: catalogId
 *           description: Numeric ID of the catalog to delete.
 *       responses:
 *         200:
 *           description: OK
 */
router.delete('/:id', async (req, res) => {
  try {
    await Catalog.delete(+req.params.id)
    res.status(204).json({})
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Server error'
    })
  }
})

module.exports = router