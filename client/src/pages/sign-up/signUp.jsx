import { useState, useContext } from "react";
import styles from "../login/login.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastSetting } from "../../utli/settings";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function signUp() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChangeFunction = (e) => {
    const value = e.target.value;
    setUserData({ ...userData, [e.target.name]: value });
    console.log(userData);
  };

  const registrationFunction = async (e) => {
    e.preventDefault();
    const { name, email, password } = userData;

    if (!name || !email || !password) {
      console.log("failds required ");
      toast.warn("failds required ", toastSetting);
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post("api/user/register", userData);
      console.log(response);
      toast.success("register succes", toastSetting);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      toast.error(error.response.data.message, toastSetting);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <ToastContainer />

      <h3>Registration </h3>
      <form>
        <input
          type="text"
          placeholder="enter your name "
          name="name"
          onChange={handleChangeFunction}
        />
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
        <button
          type="submit"
          onClick={registrationFunction}
          disabled={isLoading}
        >
          {" "}
          Registration {isLoading ? "...." : ""}
        </button>
      </form>
    </div>
  );
}

export default signUp;
