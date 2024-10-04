import { useEffect, useContext, useState } from "react";
import UserCard from "../../components/userCard/UserCard";
import styles from "./home.module.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useCallback } from "react";
import { io } from "socket.io-client";

import Chatbox from "../../components/chatbox/Chatbox";
const Home = () => {
  const { userAuth } = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [potintioalChats, setPotintioalChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  console.log(onlineUsers, "onlineUsers");

  const updateCurrentChat = useCallback((cChat) => {
    setCurrentChat(cChat);
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`api/chats/${userAuth.id}`)
      .then((res) => {
        console.log(res);
        setChats(res.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [userAuth]);

  useEffect(() => {
    if (socket == null) return;
    socket.emit("addNewUser", userAuth?.id);
    socket.on("getOnlineUsers", (response) => {
      setOnlineUsers(response);
    });
    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios.get(`api/messages/${currentChat?._id}`);
        const data = response.data;
        console.log(data, " getMessages");
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("api/user");
        const data = response.data;

        const pChat = data.filter((u) => {
          let isChatCreated = false;
          if (userAuth?.id == u._id) return false;

          if (chats) {
            isChatCreated = chats?.some((chat) => {
              return chat.members[0] == u._id || chat.members[1] == u._id;
            });
          }
          return !isChatCreated;
        });

        setPotintioalChats(pChat);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, [chats]);

  const createChat = async (id) => {
    try {
      const response = await axios.post("api/chats", {
        firstId: id,
        secId: userAuth.id,
      });
      console.log(response.data, " res chat data");
      setChats((pre) => [...pre, response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.homeContainer}>
      <div>
        {loading
          ? "loading ... "
          : chats.length == 0
          ? "no chats"
          : chats.map((chat) => (
              <UserCard
                chat={chat}
                user={userAuth}
                key={chat._id}
                updateCurrentChat={updateCurrentChat}
                onlineUsers={onlineUsers}
              />
            ))}

        <p className={styles.createChatLabel}>Create new Chat ?</p>
        <div className={styles.potintioalChatsWraper}>
          {potintioalChats.length > 0
            ? potintioalChats.map((u) => (
                <p key={u._id} onClick={() => createChat(u._id)}>
                  {u.name}
                </p>
              ))
            : ""}
        </div>
      </div>
      <Chatbox
        currentChat={currentChat}
        messages={messages}
        setMessages={setMessages}
        socket={socket}
      />
    </div>
  );
};

export default Home;
