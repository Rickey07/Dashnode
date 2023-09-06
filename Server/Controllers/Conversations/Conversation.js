const { GET_ALL_CONVERSATIONS } = require('../../Constants/Queries/get');
const Conversation = require('../../Models/Conversations/Conversation');
const parseFilteringToQuery = require('../../Utils/parseFilteringToQuery');
const responseHandler = require('../../Utils/responseHandler');

class conversationController {

    async getAllConversations (req,res) {
        try {
            const {filtering} = req.query
            let query = GET_ALL_CONVERSATIONS
            if(filtering?.length) {
                const parsedFiltering = parseFilteringToQuery(' WHERE',filtering)
                query+=parsedFiltering
            }
            const result = await Conversation.getConversations(query)
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


    async startNewConversation (req,res) {
        try {
            const data = req.body
            const result = await Conversation.startConversation(data)
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
 
    async deleteExistingCoversation (req,res) {
        try {
            const data = {
                columnName:"id",
                operator:"=",
                value:req.params.conversation_id
            }
            const result = await Conversation.deleteConversation(data)
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

module.exports = new conversationController();