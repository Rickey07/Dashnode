const { GET_ALL_CHAT_GROUPS } = require('../../Constants/Queries/get');
const ChatGroup = require('../../Models/ChatGroups/ChatGroups');
const parseFilteringToQuery = require('../../Utils/parseFilteringToQuery');
const responseHandler = require('../../Utils/responseHandler');
const uploadImage = require('../../Utils/uploadImage')

class chatGroupController {

    async getAllConversations (req,res) {
        try {
            const {filtering} = req.query
            let query = GET_ALL_CHAT_GROUPS
            if(filtering?.length) {
                const parsedFiltering = parseFilteringToQuery(' WHERE',filtering)
                query+=parsedFiltering
            }
            const result = await ChatGroup.GetAllGroups(query)
            if(result?.detail) {
                const message = result?.detail ?? "Error While Starting New Conversation"
                return responseHandler(res,500,false,{},message)
            } else {
                return responseHandler(res,200,true,result,"")
            }
        } catch (error) {
            return responseHandler(res,500,false,{},"Internal Server Error Occured!")
        }
    }


    async createNewGroup (req,res) {
        try {
            if (req.file) {
                const image_url = await uploadImage(req.file);
                req.body.group_image = image_url;
              }
            const data = req.body
            const result = await ChatGroup.createGroup(data)
            if(result?.detail) {
                const message = result?.detail ?? "Error While Creating New Group"
                return responseHandler(res,500,false,{},message)
            } else {
                return responseHandler(res,200,true,result,"")
            }
        } catch (error) {
            return responseHandler(res,500,false,{},"Internal Server Error Occured!")
        }
    }

    async updateExistingGroup (req,res) {
        try {
            if (req.file) {
                const image_url = await uploadImage(req.file);
                req.body.group_image = image_url;
              }
            const data = {
                dataForUpdate:{
                    ...req.body
                },
                conditions:{
                    columnName:"id",
                    operator:"=",
                    value:req.params?.group_id
                }
            }
            const result = await ChatGroup.updateGroup(data)
            if(result?.detail) {
                const message = result?.detail ?? "Error While Updating Existing Group"
                return responseHandler(res,500,false,{},message)
            } else {
                return responseHandler(res,200,true,result,"")
            }
        } catch (error) {
            return responseHandler(res,500,false,{},"Internal Server Error Occured!")
        }
    }
 
    async deleteExistingGroup (req,res) {
        try {
            const data = {
                columnName:"id",
                operator:"=",
                value:req.params?.group_id
            }
            const result = await ChatGroup.deleteGroup(data)
            if(result?.detail) {
                const message = result?.detail ?? "Error While Deleting!"
                return responseHandler(res,500,false,{},message)
            } else {
                return responseHandler(res,200,true,result,"Deleted Successfully!")
            }
        } catch (error) {
            return responseHandler(res,500,false,{},"Internal Server Error Occured!")
        }
    }

}

module.exports = new chatGroupController();