const {masterQuery} = require('../../Utils/masterQuery');
const {executeQuery} = require('../../Utils/executeQuery');


class Connection {

    async showConnections (query) {
        try {
            const result = await executeQuery(query);
            return result
        } catch (error) {
            return error
        }
    }

    async sendRequest (data) {
        try {
            const query = masterQuery("create",data,"connection")
            const result = executeQuery(query);
            return result
        } catch (error) {
            return error
        }
    }

    async recieveRequest (data) {
        try {
            const query = masterQuery("update",data,"connection")
            const result = executeQuery(query)
            return result
        } catch (error) {
            return error
        }
    }

    async declineRequest (data) {
        try {
            const query = masterQuery("delete",data,"connection")
            const result = executeQuery(query)
            return result
        } catch (error) {
            return error
        }
    }
}

module.exports = new Connection();