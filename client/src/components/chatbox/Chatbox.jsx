import styles from "./chatbox.module.css";
import axios from "axios";
import sendBtn from "../../../public/Plain.svg";
import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
function Chatbox({ currentChat, messages, setMessages, socket }) {
  const { userAuth } = useContext(AuthContext);
  const [recipientUser, setRecipientUser] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [MsgisLoading, setMsgLoading] = useState(false);
  const [newMessage, setNewMessage] = useState(null);
  const [textMsg, setTextMsg] = useState("");
  const containerRef = useRef(null);
  const lastItemRef = useRef(null);

  const recipientId = currentChat?.members.find((id) => id !== userAuth.id);

  setTimeout(() => {
    if (lastItemRef.current) {
      lastItemRef.current.scrollIntoView({ behavior: "smooth", inline: "end" });
    }
  }, 0); // Timeout to wait for DOM to update

  const sendMessageFunction = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("api/messages", {
        senderId: userAuth.id,
        chatId: currentChat._id,
        text: textMsg,
      });
      setNewMessage(response?.data);
      setMessages((pre) => [...pre, response.data]);
      setTextMsg("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!recipientId) return undefined;

    const getChat = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`api/user/find/${recipientId}`);
        setRecipientUser(response.data);
        console.log(response.data, " response data ");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getChat();
  }, [recipientId]);

  useEffect(() => {
    if (socket === null) return;
    socket.emit("sendMessage", { ...newMessage, recipientId });
  }, [newMessage]);

  useEffect(() => {
    if (socket === null) return;

    socket.on("getMessage", (res) => {
      if (currentChat._id !== res.chatId) return;
      setMessages((pre) => [...pre, res]);
    });

    return () => {
      socket.off("getMessage");
    };
  }, [socket, currentChat]);

  if (!recipientId)
    return (
      <div>
        <p style={{ textAlign: "center" }}>
          No conversation selected yet .. !{" "}
        </p>
      </div>
    );

  if (isLoading) return <p>loading ... </p>;

  return (
    <div>
      <div className={styles.chatboxHeader}> {recipientUser?.name}</div>
      <div className={styles.chatContent} ref={containerRef}>
        {messages &&
          messages.map((message, index) => {
            return (
              <div
                key={index}
                ref={index === messages.length - 1 ? lastItemRef : null}
                className={`${styles.message} ${
                  message?.senderId == userAuth?.id ? styles.senderMessage : ""
                }`}
              >
                <span>{message?.text}</span>
              </div>
            );
          })}
      </div>
      <form className={styles.inputWraper}>
        <input
          type="text"
          value={textMsg}
          onChange={(e) => setTextMsg(e.target.value)}
        />
        <button onClick={sendMessageFunction} type="submit">
          <img src={sendBtn} alt="sendBtn" />
        </button>
      </form>
    </div>
  );
}

export default Chatbox;
