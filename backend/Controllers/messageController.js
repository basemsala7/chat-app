const messageModel = require("../Models/messageModel.js");

const createMessage = async (req, res) => {
  const { chatId, senderId, text } = await req.body;

  try {
    const message = new messageModel({ chatId, senderId, text });
    const response = await message.save();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getMessages = async (req, res) => {
  const { chatId } = await req.params;

  try {
    const messages = await messageModel.find({ chatId });
    return res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = { createMessage, getMessages };
