/**
 * @Note Add Your Operator in QueryOperators constant. 
 * @params Filtering Clause HAVING OR WHERE Example:[{field_name:"example_field",operator:"contains",value:"hello_world"}]
 * @returns A Sub Query For Filtering
 */

const queryOperators = require("../Constants/Queries/queryOperators");
const decodeData = require("./decodeData");

const operatorValMapper = (operator, value) => {
  const SQLOperator = queryOperators[operator?.toLowerCase()];
  const isLikeOperator = operator?.toLowerCase()?.includes("contains");
  return isLikeOperator
    ? `${SQLOperator} '%${value}%'`
    : `${SQLOperator} ${value}`;
};

const parseFilteringToQuery = (filteringClause,filtering) => {
  const decodedFiltering = decodeData(filtering);
  let filteringQuery = `${filteringClause} `;
  if (decodedFiltering.length) {
    for (let i = 0; i < decodedFiltering.length; i++) {
      const { field_name, operator, value } = decodedFiltering[i];
     const havingQuery =
        i === 0
          ? `${field_name} ${operatorValMapper(operator, value)}`
          : `AND ${field_name} ${operatorValMapper(operator, value)}`;
      filteringQuery += havingQuery;
    }
  }
  return filteringQuery;
};

module.exports = parseFilteringToQuery;
