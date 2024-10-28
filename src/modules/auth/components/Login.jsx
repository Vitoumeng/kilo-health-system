import { useState } from "react";
import "./Login.css";
import { useAuth } from "../core/action";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const { username, password } = user;

  const [errMessage, setErrMessage] = useState("");

  const { login } = useAuth();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username && password) {
      login(user);
    }
  };

  return (
    <section id="login">
      <div className="container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="input">
            <input
              type="text"
              name="username"
              id="username"
              placeholder=""
              onChange={handleChange}
            />
            <label htmlFor="username">Username</label>
          </div>
          <div className="input">
            <input
              type="text"
              placeholder=""
              name="password"
              id="password"
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
          </div>
          {errMessage ? <span>{errMessage}</span> : null}
          <button className="button">Login</button>
        </form>
      </div>
    </section>
  );
};

export default Login;
