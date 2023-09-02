const { masterQuery } = require("../../Utils/masterQuery");
const { executeQuery } = require("../../Utils/executeQuery");

class blogsModel {
  async getBlogs(data) {}

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
