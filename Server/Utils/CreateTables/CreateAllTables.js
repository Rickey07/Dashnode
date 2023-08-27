/**
 * This function runs a given query at any time but it is highly recommended to use it only if you want to use DDL instead of DML.
 * For DML use Execute Query Function
 */

const db = require('../connectToDb')

async function createAnyTable (query,tableName) {
    try {
       const data = await db.query(query)
       console.log(data,`${tableName} Created Successfully`)
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    createAnyTable
}