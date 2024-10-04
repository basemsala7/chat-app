import styles from "./userCard.module.css";
import avatar from "../../../public/Avatar.svg";
import { useEffect, useState } from "react";
import axios from "axios";
const UserCard = ({ chat, user, isAuth, updateCurrentChat, onlineUsers }) => {
  const [recipientUser, setRecipientUser] = useState(null);

  const recipientId = chat?.members.find((id) => id !== user.id);

  useEffect(() => {
    if (!recipientId) return null;
    axios
      .get(`api/user/find/${recipientId}`)
      .then((res) => {
        setRecipientUser(res.data);
      })
      .catch((e) => console.log(e));
  }, [recipientId]);

  return (
    <div className={styles.card} onClick={() => updateCurrentChat(chat)}>
      <div className={styles.avatarWraper}>
        <img src={avatar}></img>
        <div>
          <p>{recipientUser?.name}</p>
          <span>text message</span>
        </div>
      </div>

      <p>12-12-2003</p>

      {onlineUsers.map((u) =>
        u.userId == recipientUser?._id ? (
          <p className={styles.messageCount} key={u.userId}></p>
        ) : (
          ""
        )
      )}
    </div>
  );
};

export default UserCard;
