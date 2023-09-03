const {masterQuery} = require('../../Utils/masterQuery');
const {executeQuery} = require('../../Utils/executeQuery');

class LikeModel {
    async  getLikes (query) {
        try {
            const result = await executeQuery(query)
            return result
        } catch (error) {
            return error
        }
    }

    async createLike (data) {
        try {
            const query = masterQuery("create",data,"likes")
            const result = await executeQuery(query);
            return result
        } catch (error) {
            return error
        }
    }

    async deleteLike (data) {
        try {
            const query = masterQuery("delete",data,"likes")
            const result = await executeQuery(query)
            return result
        } catch (error) {
            return result
        }
    }
}

module.exports = new LikeModel();