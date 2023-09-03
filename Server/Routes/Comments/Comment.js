const express = require('express');
const router = express.Router();
const commentsController = require('../../Controllers/Comments/Comment')

router.get('/comments',commentsController.getComments)
router.post('/comments/:blog_id',commentsController.createComments)
router.patch('/comments',commentsController.updateComments)
router.delete("/comments/:id",commentsController.deleteComment)



module.exports = router