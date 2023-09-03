const { GET_ALL_COMMENTS } = require("../../Constants/Queries/get");
const Comment = require("../../Models/Comments/Comment");
const responseHandler = require("../../Utils/responseHandler");
const parseFilteringToQuery = require('../../Utils/parseFilteringToQuery');
const { executeQuery } = require("../../Utils/executeQuery");

class commentsController {
  async createComments(req, res) {
    try {
      const post_id = req.params.blog_id;
      const data = {
        post_id,
        ...req.body,
      };
      const result = await Comment.createComment(data);
      if (result?.detail) {
        return responseHandler(res, 500, false, result?.detail);
      } else {
        return responseHandler(
          res,
          200,
          true,
          result,
          "Comment Added Successfully!"
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

  async updateComments(req, res) {
    try {
      const data = {
        dataForUpdate: {
          ...req.body,
        },
        conditions: {
          columnName: "id",
          operator: "=",
          value: req.body.id,
        },
      };
      const result = await Comment.updateComment(data);
      if (result?.detail) {
        return responseHandler(res, 500, false, result?.detail);
      } else {
        return responseHandler(
          res,
          200,
          true,
          result,
          "Comment Updated Successfully!"
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

  async getComments(req, res) {
    try {
      let query = GET_ALL_COMMENTS
      const {filtering,order_by , sort_by} = req.query
      if(filtering) {
        const filterQuery = parseFilteringToQuery(' WHERE',filtering)
        query+=filterQuery
      }
      const restQuery = ` ORDER BY ${order_by} ${sort_by?.toUpperCase()}`
      query+=restQuery
      const result = await Comment.getComments(query)

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

  async deleteComment(req, res) {
    try {
      const comment_id = req.params.id;
      const queryData = {
        columnName: "id",
        operator: "=",
        value: comment_id,
      };
      const result = await Comment.deleteComment(queryData);
      if (result?.detail) {
        return responseHandler(res, 500, false, result?.detail);
      } else {
        return responseHandler(res, 200, true, {} ,"Comment Deleted Successfully!");
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
}

module.exports = new commentsController();
