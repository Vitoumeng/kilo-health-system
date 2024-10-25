import { useState } from "react";
import "./Login.css";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "123") {
      window.location.href = "/";
    } else if (username !== "admin") {
      setErrMessage("Incorrect username");
    } else if (password !== "123") {
      setErrMessage("Incorrect password");
    }
  };

  console.log(username, password);

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
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="username">Username</label>
          </div>
          <div className="input">
            <input
              type="text"
              placeholder=""
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
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
