const db = require('./connectToDb')

async function executeQuery  (query) {
    try {
        const data = await db.query(query)
        return data
    } catch (error) {
        return error.msg
    }
}

module.exports = {
    executeQuery
}