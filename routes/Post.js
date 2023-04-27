const express = require("express")
const router = express.Router()
const postController = require('../controllers/Post')

router.post('/getPublish', postController.getAllPost)
router.post("/getPost", postController.getAuthorsPost)
router.post('/addPost', postController.addPost)
router.post('/updatePost', postController.updatePost)
router.post('/deletePost', postController.deletePost)
router.post('/getByID', postController.getPostById)
router.post('/publish', postController.publishPost)
module.exports = router