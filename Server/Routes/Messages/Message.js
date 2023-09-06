const express = require('express');
const router = express.Router()
const messageController = require('../../Controllers/Message/Message')

router.get('/messages',messageController.getAllMessages)
router.post('/messages',messageController.sendMessage);
router.patch('/messages/:id',messageController.editMessage);
router.delete('/messages/:id',messageController.deleteMessage)

module.exports = router