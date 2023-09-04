const connnection = require("../../Models/Connnections/Connection");
const responseHandler = require("../../Utils/responseHandler");
const parseFilteringToQuery = require('../../Utils/parseFilteringToQuery');
const { GET_ALL_CONNECTIONS } = require("../../Constants/Queries/get");

class connectionsController {
  async sendRequest(req, res) {
    try {
      const data = req.body;
      const result = await connnection.sendRequest(data);
      if (result?.detail) {
        const message = result?.detail ?? "Error while Sending Request!";
        return responseHandler(res, 500, false, {}, message);
      } else {
        return responseHandler(res, 500, false, result, "Request Sent Successfully");
      }
    } catch (error) {
      return responseHandler(
        res,
        500,
        false,
        {},
        "Error while Sending Request!"
      );
    }
  }

  async recieveRequest(req,res) {
    try {
        const data = {
            dataForUpdate:{
                ...req.body
            },
            conditions:{
                columnName:"id",
                operator:"=",
                value:req.body.id
            }
        }
        const result = await connnection.recieveRequest(data);
        if (result?.detail) {
          const message = result?.detail ?? "Error while Accepting Request!";
          return responseHandler(res, 500, false, {}, message);
        } else {
          return responseHandler(res, 200, true, result, "Request Accepted");
        }
      } catch (error) {
        return responseHandler(
          res,
          500,
          false,
          {},
          "Error while Accepting this request Request!"
        );
      }
  }

  async declineRequest(req,res) {
    try {
        const data = {
                columnName:"id",
                operator:"=",
                value:req.body.id
        }
        const result = await connnection.declineRequest(data);
        if (result?.detail) {
          const message = result?.detail ??  "Error while Declining this Request!"
          return responseHandler(res, 500, false, {}, message);
        } else {
          return responseHandler(res, 200, true, result, "Rejected");
        }
    } catch (error) {
        return responseHandler(
            res,
            500,
            false,
            {},
            "Error while Declining this Request!"
          );
    }
  }

  async showConnections (req,res) {
    try {
        const {filtering} = req.query
        let query = GET_ALL_CONNECTIONS
        if(filtering.length) {
          const parsedFiltering = parseFilteringToQuery(' WHERE',filtering)
          query+=parsedFiltering
        }
        const result = await connnection.showConnections(query)
        if (result?.detail) {
          const message = result?.detail ??  "Error while Processing your request!"
          return responseHandler(res, 500, false, {}, message);
        } else {
          return responseHandler(res, 200, true, result, "");
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

module.exports = new connectionsController();
