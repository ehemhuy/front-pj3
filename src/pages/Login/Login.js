import axios from "axios";
import cookie from "react-cookies";
import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartContext from "../../contexts/CartContext";
import UserContext from "../../contexts/UserContext";
import "./Login.css";
import validation from "./validation";

function Login(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
    err: {
      email: "",
      password: "",
    },

    isUser: false,
  });

  const userValue = useContext(UserContext);
  const cartValue = useContext(CartContext);

  function handleInput(e) {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  }

  const Submit = async (e) => {
    e.preventDefault();
    const { email, password } = state;

    let errNew = { ...state.err };
    Object.keys(errNew).forEach((key) => {
      errNew[key] = validation[key](state[key]);
    });

    setState({
      ...state,
      err: errNew,
    });

    for (let key in errNew) {
      if (errNew[key] != null && errNew[key] != "") {
        console.log("đã có lỗi" + errNew[key]);
        return;
      }
    }

    let user = {
      email: state.email,
      password: state.password,
    };

    axios
      .post("/auth/login", { user: user })
      .then((res) => {
        const user = res.data.user;
        cookie.save("access_token", res.data.access_token);
        cookie.save("refresh_token", res.data.refresh_token);
        cookie.save("role", user.role);
        userValue.setIsLogin(true);
        userValue.setFirstName(user.firstName);
        localStorage.setItem("firstName", user.firstName);
        localStorage.setItem("lastName", user.lastName);
        cartValue.uploadCart();
        setState({
          isUser: true,
        });
        window.location.href = "/";
      })
      .catch((err) => {
        // console.log(err.response)
        if (err.response.data.message) toast.error(err.response.data.message);
        else toast.error("Đăng nhập thất bại");
      });
  };

  if (state.isUser) return <Redirect to="/" />;
  return (
    <div className="bglogin">
      <ToastContainer />
      <div style={{ marginBottom: "5%" }}></div>
      <div
        className="login col-lg-4 col-md-5 col-sm-6"
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "10px",
          border: "1px black solid",
          borderRadius: "30px",
          padding: "20px",
        }}
      >
        <h1 className="text-center">Đăng nhập</h1>
        <br />

        <form>
          <div className="form-group">
            <label htmlFor="email" className="col-sm form-control-label">
              Email
            </label>
            <div className="col-sm">
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                value={state.email}
                onChange={handleInput}
              />
            </div>
            <p className="form-text  text-danger login-err" id="invalid-email">
              {state.err?.email}
            </p>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="col-sm form-control-label">
              Mật khẩu
            </label>
            <div className="col-sm">
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                value={state.password}
                onChange={handleInput}
              />
            </div>
            <p
              className="form-text  text-danger login-err "
              id="invalid-password"
            >
              {state.err?.password}{" "}
            </p>
          </div>

          <br />

          <div className="form-group">
            <div className="col-sm-offset-2 col-sm">
              <button
                type="submit"
                id="submit"
                className="btn btn-primary"
                onClick={Submit}
              >
                Đăng nhập
              </button>
            </div>
          </div>
          <p
            style={{ fontSize: "small", paddingLeft: "15px" }}
            className="form-text  text-success"
            id="valid"
          />

          <p style={{ paddingLeft: "15px" }}>
            Chưa có tài khoản?
            <Link to="/register"> Đăng ký</Link>
          </p>
        </form>
        <script type="text/javascript" src="validation.js"></script>
      </div>
    </div>
  );
}

export default Login;
