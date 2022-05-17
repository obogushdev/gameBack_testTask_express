const {Router} = require('express')
const User = require('./service')
const router = Router()

/**
 * @swagger
 * /user:
 *     get:
 *       summary: Gets all users
 *       tags:
 *         - User
 *       produces:
 *         - application/json
 *       responses:
 *         200:
 *           description: OK
 */
router.get('/', async (req, res) => {
  try {
    const user = await User.findAll()
    res.status(200).json(user)
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Server error'
    })
  }
})
/**
 * @swagger
 * /user/{userAddress}:
 *     get:
 *       summary: Gets a user by ID.
 *       tags:
 *         - User
 *       parameters:
 *         - in: path
 *           name: userAddress
 *           type: string
 *           required: true
 *           description: String Address of the user to get.
 *       produces:
 *         - application/json
 *       responses:
 *         200:
 *           description: OK
 */
router.get('/:address', async (req, res) => {
  try {
    const user = await User.findOne(req.params.address)
    res.status(200).json(user)
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Server error'
    })
  }
})
/**
 * @swagger
 * /user:
 *     post:
 *       summary: Create new user.
 *       tags:
 *         - User
 *       consumes:
 *         - application/json
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: body
 *           required: true
 *           name: user
 *           description: The user to create.
 *           schema:
 *             $ref: '#/definitions/User'     # <----------
 *       responses:
 *         201:
 *           description: OK
 * definitions:
 *   User:           # <----------
 *     type: object
 *     properties:
 *       address:
 *         type: string
 *       cash1:
 *         type: integer
 *       cash2:
 *         type: integer
 *       cash3:
 *         type: integer
 */
router.post('/', async (req, res) => {
  try {
    const {address, cash1, cash2, cash3} = req.body
    const user = await User.create({
      address, cash1, cash2, cash3
    })
    res.status(201).json({user})
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
 * /user/{userAddress}:
 *     put:
 *       summary: Update existing user.
 *       tags:
 *         - User
 *       consumes:
 *         - application/json
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: path
 *           required: true
 *           name: userAddress
 *           description: String address of the user to update.
 *         - in: body
 *           required: true
 *           name: user
 *           description: The user to update.
 *           schema:
 *             $ref: '#/definitions/User'     # <----------
 *       responses:
 *         201:
 *           description: OK
 * definitions:
 *   User:           # <----------
 *     type: object
 *     properties:
 *       address:
 *         type: string
 *       cash1:
 *         type: integer
 *       cash2:
 *         type: integer
 *       cash3:
 *         type: integer
 */
router.put('/:address', async (req, res) => {

  try {
    const {address, cash1, cash2, cash3} = req.body
    const user = await User.update(req.params.address, {address, cash1, cash2, cash3})
    res.status(200).json({user})

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
 * /user/{userAddress}:
 *     delete:
 *       summary: Delete existing user.
 *       tags:
 *         - User
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: path
 *           required: true
 *           name: userAddress
 *           description: String address of the user to delete.
 */
router.delete('/:address', async (req, res) => {
  try {
    await User.delete(req.params.address)
    res.status(204).json({})
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Server error'
    })
  }
})

module.exports = router