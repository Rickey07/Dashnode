const blogsModel = require("../../Models/Blogs/Blog");
const uploadImage = require("../../Utils/uploadImage");
const responseHandler = require("../../Utils/responseHandler");

class BlogsController {
  async getBlog(req, res) {
    try {
      const queryData = req.query
      const result = await blogsModel.getBlogs(queryData)
      if(result) {
        return responseHandler(res,200,true,result)
      }
    } catch (error) {
      return responseHandler(
        res,
        500,
        false,
        {},
        "Internal Server Error Occured!"
      );
    }
  }

  async saveBlog(req, res) {
    try {
      if (req.file) {
        const image_url = await uploadImage(req.file);
        req.body.image_url = image_url;
      }
      const blogsData = req.body;
      const result = await blogsModel.createBlog(blogsData);
      if (result) {
        return responseHandler(res, 200, true, result);
      }
    } catch (error) {
      return responseHandler(
        res,
        500,
        false,
        {},
        "Internal Server Error Occured!"
      );
    }
  }

  async updateBlog(req, res) {
    try {
      if (req.file) {
        const image_url = await uploadImage(req.file);
        req.body.image_url = image_url;
      }
      const queryData = {
        dataForUpdate: {
          ...req.body,
        },
        conditions: {
          columnName: "id",
          operator: "=",
          value: req.params.id,
        },
      };
      const result = await blogsModel.updateBlog(queryData);
      if (result) {
        return responseHandler(
          res,
          200,
          true,
          false,
          "Blog Post Updated Successfully"
        );
      }
    } catch (error) {
      return responseHandler(
        res,
        500,
        false,
        {},
        "Internal Server Error Occured!"
      );
    }
  }

  async deleteBlog(req, res) {
    try {
      const conditions = {
        columnName: "id",
        operator: "=",
        value: req.body.id,
      };
      const data = await blogsModel.deleteBlog(conditions);
      return responseHandler(
        res,
        200,
        true,
        false,
        "Blog Post Deleted Successfully"
      );
    } catch (error) {
      return responseHandler(
        res,
        500,
        false,
        {},
        "Internal Server Error Occured!"
      );
    }
  }
}

module.exports = new BlogsController();
