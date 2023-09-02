const express = require('express')
const router = express.Router();
const upload = require('../../Middlewares/Miscellaneous/uploadFile')
const BlogController = require('../../Controllers/Blogs/Blog')

router.post('/blogs/new',upload.single('post_image'),BlogController.saveBlog)
router.delete('/blogs',BlogController.deleteBlog)
router.patch('/blogs/update/:id',upload.single('post_image'),BlogController.updateBlog)

module.exports = router;