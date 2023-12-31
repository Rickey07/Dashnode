/**
 *
 * @param {*} queryType
 * @param {*} queryData
 * @param {*} table
 * @returns A SQL query to according to given data.later we can execute the query through executeQuery Function.
 */

const dataTypeMapper = require('./dataTypeMapper')

const masterQuery = (queryType, queryData, table, paramterized = false) => {
  let query = "";
  switch (queryType) {
    case "create":
      const columns = Object.keys(queryData)?.join(",");
      const values = Object.values(queryData)
        ?.map((data) => dataTypeMapper(data))
        ?.join(",");
      const paramterizedValues = Object.values(queryData)
        ?.map((data, index) => `$${index + 1}`)
        ?.join(",");
      query = `INSERT INTO ${table} (${columns}) VALUES (${
        paramterized ? paramterizedValues : values
      }) RETURNING *`;
      break;
    case "update":
      const data = Object.entries(queryData?.dataForUpdate)
        ?.map(([column, value]) => `${column} = '${value}'`)
        .join(", ");
      query = `UPDATE ${table} SET ${data} WHERE ${
        queryData?.conditions?.columnName
      } ${queryData?.conditions?.operator} ${dataTypeMapper(
        queryData?.conditions?.value
      )} RETURNING *`;
      break;
    case "delete":
      query = `DELETE FROM ${table} WHERE ${queryData?.columnName} ${
        queryData?.operator
      } ${dataTypeMapper(queryData?.value)}`;
      break;
    case "get":
      query = generateGetQuery(queryData, table);
      break;
    default:
      break;
  }
  return query;
};

function generateGetQuery(data, tableName) {
  const { fields, joins, where, order_by, limit } = data;
  let query = `SELECT ${fields ? fields : "*"} FROM ${tableName}`;
  if (joins) {
    joins.forEach((join) => {
      query += `${join.type} ${join.table} ON ${join.values.joinValue1} = ${join.values.joinValue2}`;
    });
  }

  if (where) {
    query += ` WHERE ${where.columnName}='${where.value}'`;
  }

  if (order_by) {
    query += ` ORDER BY ${order_by}`;
  }

  if (limit) {
    query += ` LIMIT ${limit}`;
  }
  return query;
}

// function dataTypeMapper(data) {
//   const type = typeof data;
//   switch (type) {
//     case "string":
//       return `'${data}'`;
//     default:
//       return data;
//   }
// }

module.exports = {
  masterQuery,
};
