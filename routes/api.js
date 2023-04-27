const express = require("express")
const router = express.Router()
const user = require('./User')
const post = require('./Post')

router.use('/user', user)
router.use('/post', post)


module.exports = router