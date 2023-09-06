const express = require('express');
const router = express.Router();
const conversationController = require('../../Controllers/Conversations/Conversation');


router.get('/conversations',conversationController.getAllConversations)
router.post('/conversations/new',conversationController.startNewConversation)
router.delete('/conversations/delete/:conversation_id',conversationController.deleteExistingCoversation)


module.exports = router;