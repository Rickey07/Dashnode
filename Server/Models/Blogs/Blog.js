const { masterQuery } = require("../../Utils/masterQuery");
const { executeQuery } = require("../../Utils/executeQuery");
const decodeData = require("../../Utils/decodeData");
const parseFilteringToQuery = require("../../Utils/parseFilteringToQuery");
const allGetQueries = require("../../Constants/Queries/get");
const { GET_ALL_BLOGS } = allGetQueries;

class blogsModel {
  async getBlogs(data) {
    // Query Logic Here
    const { order_by, limit, offset, sort_by, filtering } = data;
    let query = GET_ALL_BLOGS;
    if (filtering.length) {
      const filteringQuery = parseFilteringToQuery(` HAVING`, filtering);
      query = query + filteringQuery;
    }
    const restQuery = `ORDER BY ${order_by} ${sort_by}
    LIMIT ${limit}
    OFFSET ${offset};`;
    query += restQuery;
    try {
      const result = await executeQuery(query);
      return result;
    } catch (error) {
      return error;
    }
  }

  async createBlog(data) {
    try {
      const query = masterQuery("create", data, "blogs", true);
      const parameterizedValues = Object.values(data);
      const result = await executeQuery(query, true, [...parameterizedValues]);
      return result;
    } catch (error) {
      return error;
    }
  }

  async updateBlog(data) {
    try {
      const query = masterQuery("update", data, "blogs");
      const result = await executeQuery(query);
      return result;
    } catch (error) {
      return error;
    }
  }

  async deleteBlog(data) {
    try {
      const query = masterQuery("delete", data, "blogs");
      const result = await executeQuery(query);
      return result;
    } catch (error) {
      return error;
    }
  }
}

module.exports = new blogsModel();
