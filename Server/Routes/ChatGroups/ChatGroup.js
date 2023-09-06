const express = require('express');
const router = express.Router();
const chatGroupController = require('../../Controllers/ChatGroups/ChatGroup')
const upload = require('../../Middlewares/Miscellaneous/uploadFile')

router.get("/chatgroups",chatGroupController.getAllConversations)
router.post("/chatgroups/new",upload.single('group_image'),chatGroupController.createNewGroup)
router.patch("/chatgroups/:group_id",upload.single('group_image'),chatGroupController.updateExistingGroup)
router.delete("/chatgroups/:group_id",chatGroupController.deleteExistingGroup)

module.exports = router