/**
 * 
 * @param {*} queryType 
 * @param {*} queryData 
 * @param {*} table 
 * @returns A SQL query to according to given data.later we can execute the query through executeQuery Function.
 */

const masterQuery = (queryType,queryData,table) => {
    let query = '';
    switch (queryType) {
        case "create":
            const columns = Object.keys(queryData)?.join(',');
            const values = Object.values(queryData)?.map((data) => dataTypeMapper(data))?.join(',')
            query = `INSERT INTO ${table} (${columns}) VALUES (${values}) RETURNING *`
            break;
        case "update":
            const data = Object.entries(data?.dataForUpdate)?.map(([column,value]) => `${column} = '${value}'`).join(', ')
            query = `UPDATE ${table} SET ${data} WHERE ${data?.conditions?.columnName} ${data?.conditions?.operator} ${data?.conditions?.value} RETURNING *`;
            break
        case 'delete':
            query = `DELETE FROM ${table} WHERE ${queryData?.columnName} ${queryData?.operator} ${queryData?.value}`
            break
        case "get":
            query = generateGetQuery(queryData,table)
            break
        default:
            break;
    }
    return query
}

 function generateGetQuery (data,tableName) {
    const {fields,joins,where,order_by,limit} = data
    let query = `SELECT ${fields ? fields : '*'} FROM ${tableName}`
    if(joins) {
        joins.forEach((join) => {
            query+= `${join.type} ${join.table} ON ${join.values.joinValue1} = ${join.values.joinValue2}`
        })
    }

    if(where) {
        query+=` WHERE ${where.columnName}='${where.value}'`
    }

    if(order_by) {
        query+=` ORDER BY ${order_by}`
    }

    if(limit) {
        query+=` LIMIT ${limit}`
    }
    return query

 }


 function dataTypeMapper (data) {
    const type = typeof data
    switch (type) {
        case "string":
            return `'${data}'` 
        default:
            return data
    }
 }

module.exports = {
    masterQuery
}