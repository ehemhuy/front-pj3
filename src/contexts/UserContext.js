import React, { useEffect, useState } from "react";
import cookie from "react-cookies";
import axios from "axios";
const UserContext = React.createContext();
export default UserContext;
export const UserConsumer = UserContext.Consumer;

export function UserProvider(props) {
  const [isLogin, setIsLogin] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState(1);
  function Logout() {
    setIsLogin(false);
    setFirstName("");
    setLastName("");
    setRole();
    localStorage.removeItem("firstName");

    axios
      .post("/auth/logout")
      .then((res) => {
        console.log("xoá token thành công");
      })
      .catch((err) => {
        console.log("xoá cookie thất bại");
      });

    cookie.remove("refresh_token");
    cookie.remove("access_token");
    cookie.remove("role");
    window.location.href = "/";
  }

  useEffect(() => {
    if (localStorage.firstName && localStorage.firstName != "undefined") {
      setIsLogin(true);
      setFirstName(localStorage.firstName);
      setLastName(localStorage.lastName);
      setRole(cookie.load("role"));
      console.log(cookie.load("role"));
    } else {
      setIsLogin(false);
      localStorage.removeItem("firstName");
      localStorage.removeItem("lastName");
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        isLogin,
        firstName,
        lastName,
        setIsLogin,
        setFirstName,
        Logout,
        role,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
