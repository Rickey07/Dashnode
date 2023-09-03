const {masterQuery} = require('../../Utils/masterQuery');
const {executeQuery} = require('../../Utils/executeQuery');

class Comment {
    async getComments (query) {
        try {
            const result = await executeQuery(query)
            return result
        } catch (error) {
            return error
        }
    }

    async createComment (data) {
        try {
            const query = masterQuery("create",data,"comments")
            const result = executeQuery(query)
            return result
        } catch (error) {
            return error
        }
    }

    async updateComment (data) {
        try {
            const query = masterQuery("update",data,"comments")
            const result = executeQuery(query)
            return result
        } catch (error) {
            return error
        }
    }

    async deleteComment (data) {
        try {
            const query = masterQuery("delete",data,"comments")
            const result = executeQuery(query)
            return result
        } catch (error) {
            return error
        }
    }
}

module.exports = new Comment()