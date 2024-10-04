import styles from "./header.module.css";
import user from "../../../public/isUser.svg";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

function Header() {
  const { isAuth, updateAuth, userAuth, updateUser } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <Link to={"/"}>
        <p>ChatApp</p>
      </Link>
      {isAuth && <p>logged in as {userAuth.name} </p>}
      {isAuth ? (
        <button
          className={styles.logout}
          onClick={() => {
            console.log("logout");
            Cookies.remove("token");
            Cookies.remove("refreshToken");
            updateUser({ name: "", email: "", id: "" });
            updateAuth(false);
          }}
        >
          log out
        </button>
      ) : (
        <img src={user} alt="" width={70} height={60} />
      )}
    </header>
  );
}

export default Header;
