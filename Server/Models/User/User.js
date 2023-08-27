const {masterQuery} = require('../../Utils/masterQuery');
const {executeQuery} = require('../../Utils/executeQuery')

class userModel {
    async getUsers () {
        
    }

    async getUserByCondition (condition) {
        try {
            const query = masterQuery("get",condition,"users")
            const data = await executeQuery(query)
            return data
        } catch (error) {
            return error
        }
    }

    async saveUser (queryData) {
        try {
            const query = masterQuery("create",queryData,"users")
            const data = await executeQuery(query)
            return data
        } catch (error) {
            return error
        }
    }
}

module.exports = new userModel()