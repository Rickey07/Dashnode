const express = require('express');
const router = express.Router()
const LikesController = require('../../Controllers/Likes/Like');

router.get('/likes',LikesController.getLikes)
router.post('/likes/:blog_id',LikesController.createLike)
router.delete('/likes/:id',LikesController.deleteLike)


module.exports = router