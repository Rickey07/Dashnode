const {masterQuery} = require('../../Utils/masterQuery');
const {executeQuery} = require('../../Utils/executeQuery');

class MessageModel {
    async  getAllMesssages (query) {
        try {
            const result = await executeQuery(query)
            return result
        } catch (error) {
            return error
        }
    }

    async sendMessage (data) {
        try {
            const query = masterQuery("create",data,"messages")
            const result = await executeQuery(query);
            return result
        } catch (error) {
            return error
        }
    }

    async editMessage (data) {
        try {
            const query = masterQuery("update",data,"messages")
            const result = await executeQuery(query);
            return result
        } catch (error) {
            return error
        }
    }

    async deleteMessage (data) {
        try {
            const query = masterQuery("delete",data,"messages")
            const result = await executeQuery(query)
            return result
        } catch (error) {
            return result
        }
    }
}

module.exports = new MessageModel();