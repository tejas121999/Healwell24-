const express = require("express")
const router = express.Router()
const postController = require('../controllers/Post')
const verify = require("../middleware/JWT")

router.post('/getPublish', verify.validateToken, postController.getAllPost)
router.post("/getPost", verify.validateToken, postController.getAuthorsPost)
router.post('/addPost', verify.validateToken, postController.addPost)
router.post('/updatePost', verify.validateToken, postController.updatePost)
router.post('/deletePost', verify.validateToken, postController.deletePost)
router.post('/getByID', verify.validateToken, postController.getPostById)
router.post('/publish', verify.validateToken, postController.publishPost)
module.exports = router