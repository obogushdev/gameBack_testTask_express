const {Router} = require('express')
const User = require('../users/service')
const Catalog = require('../catalogs/service')
const Asset = require('../assets/service')
const router = Router()

/**
 * @swagger
 * /init-tables:
 *   get:
 *     description: init empty tables with mock data
 */
router.get('/init-tables', async (req, res) => {

    try {
        await User.initTable()
        Catalog.initTable()
        Asset.initTable()

    }catch (e) {
        console.error(e)
        res.status(500).json({
            message: 'Server error'
        })
        return
    }

  res.status(200).json({
      message: 'Init started'
  })
})

module.exports = router