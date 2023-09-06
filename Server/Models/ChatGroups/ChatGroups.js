const parseFilteringToQuery = require('../../Utils/parseFilteringToQuery');
const {masterQuery} = require('../../Utils/masterQuery');
const {executeQuery} = require('../../Utils/executeQuery')

class ChatGroup {
    async GetAllGroups (query) {
        try {
            const result = await executeQuery(query);
            return result
        } catch (error) {
            return error
        }
    }

    async createGroup (data) {
        try {
            const query = masterQuery("create",data,"chat_groups")
            const result = await executeQuery(query)
            return result
        } catch (error) {
            return error
        }
    }

    async updateGroup (data) {
        try {
            const query = masterQuery("update",data,"chat_groups")
            const result = await executeQuery(query)
            return result
        } catch (error) {
            return error
        }
    }
    

    async deleteGroup (data) {
        try {
            const query = masterQuery("delete",data,"chat_groups")
            const result = await executeQuery(query)
            return result
        } catch (error) {
            return error
        }
    }
}

module.exports = new ChatGroup()