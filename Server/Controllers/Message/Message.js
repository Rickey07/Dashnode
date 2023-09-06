const { GET_ALL_MESSAGES } = require('../../Constants/Queries/get');
const Message = require('../../Models/Messages/Message');
const parseFilteringToQuery = require('../../Utils/parseFilteringToQuery');
const responseHandler = require('../../Utils/responseHandler');

class messageController {

    async getAllMessages (req,res) {
        try {
            const {filtering} = req.query
            let query = GET_ALL_MESSAGES
            if(filtering?.length) {
                const parsedFiltering = parseFilteringToQuery(' WHERE',filtering)
                query+=parsedFiltering
            }
            const result = await Message.getAllMesssages(query)
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


    async sendMessage (req,res) {
        try {
            const data = req.body
            const result = await Message.sendMessage(data)
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

    async editMessage (req,res) {
        try {
            const data = {
                dataForUpdate:{
                    ...req.body
                },
                conditions:{
                    columnName:"id",
                    operator:"=",
                    value:req.params.id
                }
            }
            const result = await Message.editMessage(data)
            if(result?.detail) {
                const message = result?.detail ?? "Error Editing This message"
                return responseHandler(res,500,false,{},message)
            } else {
                return responseHandler(res,200,true,result,"")
            }
        } catch (error) {
            return responseHandler(res,500,false,{},"Internal Server Error Occured!")
        }
    }
 
    async deleteMessage (req,res) {
        try {
            const data = {
                columnName:"id",
                operator:"=",
                value:req.params.id
            }
            const result = await Message.deleteMessage(data)
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

module.exports = new messageController();