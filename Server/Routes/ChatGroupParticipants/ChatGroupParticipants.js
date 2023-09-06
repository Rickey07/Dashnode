const express = require('express');
const router = express.Router();
const chatGroupParticipant = require('../../Controllers/ChatGroupParticipant/ChatGroupParticipant');

router.get('/participants',chatGroupParticipant.getAllGroupParticipants);
router.post('/participants',chatGroupParticipant.JoinGroup);
router.delete('/participants/:id',chatGroupParticipant.leftGroup)

module.exports = router