const ChatGroupParticipant = require('../../Models/ChatGroupParticipant/ChatGroupParticipant');
const {GET_ALL_GROUP_PARTICIPANT} = require('../../Constants/Queries/get');
const parseFilteringToQuery = require('../../Utils/parseFilteringToQuery');
const responseHandler = require('../../Utils/responseHandler')


class ChatGroupParticipantController {


    async getAllGroupParticipants (req,res) {
        try {
            let query = GET_ALL_GROUP_PARTICIPANT;
            const {filtering} = req.query
            if(filtering.length) {
                const parsedQuery = parseFilteringToQuery(` WHERE`,filtering);
                query+=parsedQuery
            }
            const result = await ChatGroupParticipant.getAllParticipant(query)
            if(result?.detail) {
                const message = result?.detail ?? "Error While Getting Details"
                return responseHandler(res,500,false,{},message)
            } else {
                return responseHandler(res,200,true,result,"")
            }
        } catch (error) {
            return responseHandler(res,500,false,{},"Internal Server Error Occured!")
        }
    }


    async JoinGroup (req,res) {
        try {
            const data = req.body
            const result = await ChatGroupParticipant.addToGroup(data)
            if(result?.detail) {
                const message = result?.detail ?? "Error While Joining this group"
                return responseHandler(res,500,false,{},message)
            } else {
                return responseHandler(res,200,true,result,"Joined Group")
            }
        } catch (error) {
            return responseHandler(res,500,false,{},"Internal Server Error Occured!")
        }
    }

    async leftGroup (req,res) {
        try {
            const data = {
                columnName:"id",
                operator:"=",
                value:req.params?.id
            }
            const result = await ChatGroupParticipant.leftGroup(data)
            if(result?.detail) {
                const message = result?.detail ?? "Error Occured while leaving this group!"
                return responseHandler(res,500,false,{},message)
            } else {
                return responseHandler(res,200,true,result,"Left Group!")
            }
        } catch (error) {
            return responseHandler(res,500,false,{},"Internal Server Error Occured!")
        }
    }
}


module.exports = new ChatGroupParticipantController();