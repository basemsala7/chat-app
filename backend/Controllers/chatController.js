const ChatModel = require("../Models/chatModel");

module.exports = {
  createChat: async (req, res) => {
    const { firstId, secId } = req.body;
    try {
      const chat = await ChatModel.findOne({
        members: { $all: [firstId, secId] },
      });

      if (chat) return res.status(200).json({ chat });

      const newChat = new ChatModel({
        members: [firstId, secId],
      });
      await newChat.save();
      return res.status(200).json(newChat);
    } catch (error) {
      return res.status(500).json({ message: "server Error " });
    }
  },

  findUserChats: async (req, res) => {
    const userId = req.params.userId;
    try {
      const chats = await ChatModel.find({
        members: { $in: [userId] },
      });

      return res.status(200).json(chats);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  findChat: async (req, res) => {
    const { firstId, secId } = req.params;
    try {
      const chat = await ChatModel.findOne({
        members: { $all: [firstId, secId] },
      });

      return res.status(200).json(chat);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
