import { useContext, useState } from "react";
import styles from "./login.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastSetting } from "../../utli/settings";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { updateUser, userAuth, updateAuth } = useContext(AuthContext);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setLoading] = useState(false);

  const handleChangeFunction = (e) => {
    const value = e.target.value;
    setUserData({ ...userData, [e.target.name]: value });
    console.log(userData);
  };

  const submitFunction = async (e) => {
    e.preventDefault();
    const { email, password } = userData;

    if (!email || !password) {
      console.log("failds required ");
      toast.warn("failds required ", toastSetting);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("api/user/login", userData);
      console.log(response);
      const { name, email, _id, token, refreshToken } = response.data.data;
      updateUser({ name, email, id: _id });
      console.log(userAuth, "this context ");

      Cookies.set("token", token);
      Cookies.set("refreshToken", refreshToken);
      toast.success("login success", toastSetting);

      setTimeout(() => {
        updateAuth(true);
        navigate("/");
      }, 1500);
    } catch (error) {
      console.log(error);
      if (error.status == 400) {
        toast.error(error.response.data.message, toastSetting);
        return;
      }
      toast.error(error.message, toastSetting);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <ToastContainer />
      <h3>log in </h3>
      <form>
        <input
          type="text"
          placeholder="enter your email "
          name="email"
          onChange={handleChangeFunction}
        />
        <input
          type="password"
          placeholder="enter your password "
          name="password"
          onChange={handleChangeFunction}
        />
        <button type="submit" onClick={submitFunction} disabled={isLoading}>
          {" "}
          log in {isLoading ? "...." : ""}
        </button>
      </form>
      <Link to={"/registration"}>create account </Link>
    </div>
  );
};

export default Login;
