const express = require('express');
const router = express.Router();
const connectionsController = require('../../Controllers/Connections/Connection')

router.get('/connections',connectionsController.showConnections)
router.post('/connections',connectionsController.sendRequest);
router.patch('/connections/update',connectionsController.recieveRequest);
router.delete('/connections/delete',connectionsController.declineRequest);

module.exports = router