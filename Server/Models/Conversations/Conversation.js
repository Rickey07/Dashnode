const parseFilteringToQuery = require('../../Utils/parseFilteringToQuery');
const {masterQuery} = require('../../Utils/masterQuery');
const {executeQuery} = require('../../Utils/executeQuery')

class Conversation {
    async getConversations (query) {
        try {
            const result = await executeQuery(query);
            return result
        } catch (error) {
            return error
        }
    }

    async startConversation (data) {
        try {
            const query = masterQuery("create",data,"conversation")
            const result = await executeQuery(query)
            return result
        } catch (error) {
            return error
        }
    }

    async deleteConversation (data) {
        try {
            const query = masterQuery("delete",data,"conversation")
            const result = await executeQuery(query)
            return result
        } catch (error) {
            return error
        }
    }
}

module.exports = new Conversation()