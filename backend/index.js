const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const userRoute = require("./Routes/userRoute.js");
const chatRoute = require("./Routes/chatRoute");
const messageRoute = require("./Routes/messageRoute");

app.use(express.json());
app.use(cors());
app.use("/api/user", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

app.get("/", (req, res) => {
  res.send("server app chat");
});

const port = process.env.PORT || 5000;
const url = process.env.ATLAS;

app.listen(port, (req, res) => {
  console.log("server running on port ", port);
});

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connected"))
  .catch((error) => console.log("database faild ", error.message));
