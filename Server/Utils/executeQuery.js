const db = require('./connectToDb')

async function executeQuery (query,paramterized=false,paramterizedValues) {
    try {
        const data = await (paramterized ? db.query(query,[...paramterizedValues]) : db.query(query))
        return data?.rows
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports = {
    executeQuery
}