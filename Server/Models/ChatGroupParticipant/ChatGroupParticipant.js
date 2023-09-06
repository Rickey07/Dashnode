const parseFilteringToQuery = require("../../Utils/parseFilteringToQuery");
const { masterQuery } = require("../../Utils/masterQuery");
const { executeQuery } = require("../../Utils/executeQuery");

class ChatGroupParticipant {


  async getAllParticipant (query) {
    try {
      const result = await executeQuery(query)
      return result
    } catch (error) {
      return error
    }
  }

  async addToGroup(data) {
    try {
      const query = masterQuery("create", data, "chat_group_participants");
      const result = await executeQuery(query);
      return result;
    } catch (error) {
      return error;
    }
  }

  async leftGroup(data) {
    try {
      const query = masterQuery("delete", data, "chat_group_participants");
      const result = await executeQuery(query);
      return result;
    } catch (error) {
        return error
    }
  }
}

module.exports = new ChatGroupParticipant();
