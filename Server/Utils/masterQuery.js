/**
 * 
 * @param {*} queryType 
 * @param {*} queryData 
 * @param {*} table 
 * @returns A SQL query to according to given data.later we can execute the query through executeQuery Function then
 */

const masterQuery = (queryType,queryData,table) => {
    let query = '';
    switch (queryType) {
        case "create":
            const columns = Object.keys(queryData)?.join(',');
            const values = Object.values(queryData)?.join(',');
            query = `INSERT INTO ${table} (${columns}) VALUES (${values}) RETURNING *`
            break;
        case "update":
            const data = Object.entries(data)?.map(([column,value]) => `${column} = '${value}'`).join(', ')
            query = `UPDATE ${table} SET ${data} WHERE id = ${data?.id} RETURNING *`;
            break
        case 'delete':
            query = `DELETE FROM ${table} WHERE id = ${data?.id}`
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
        query+=` WHERE ${where}`
    }

    if(order_by) {
        query+=` ORDER BY ${order_by}`
    }

    if(limit) {
        query+=` LIMIT ${limit}`
    }
    return query

 }
