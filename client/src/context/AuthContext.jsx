import Cookies from "js-cookie";
import { useEffect } from "react";
import { useCallback, useState, createContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setAuth] = useState(false);

  const [userAuth, setUserAuth] = useState({
    name: "",
    email: "",
    id: "",
  });

  const updateUser = useCallback((data) => {
    setUserAuth(data);
  }, []);

  const updateAuth = useCallback((data) => {
    setAuth(data);
  }, []);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      axios
        .get("api/user/info", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data[0]);
          const { name, email, _id } = res.data[0];
          setUserAuth({ name, email, id: _id });
          setAuth(true);
          console.log(userAuth);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  return (
    <>
      <AuthContext.Provider
        value={{ userAuth, updateUser, isAuth, updateAuth }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};
