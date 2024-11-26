import imgLogo from "../../../../logo.svg";
import { useLogin } from "../core/action";

const Login = () => {
  const { login, handleChangeLogin, onLogin } = useLogin();

  let { email, password } = login;

  //   console.log(login, auth);

  const onSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      onLogin();
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#1a1d1d" }}
    >
      <div
        className="d-flex px-4 py-5 flex-column align-items-center justify-content-center shadow-sm"
        style={{
          background: "#2c2f2f",
          borderRadius: "8px",
        }}
      >
        <div>
          <img
            src={imgLogo}
            alt="Login Logo"
            style={{ filter: "brightness(0.9)" }}
          />
        </div>
        <h5 className="mt-3 text-white">Sign In</h5>
        <form
          onSubmit={onSubmit}
          className="form-control d-flex flex-column border-0 bg-transparent"
        >
          <div
            className="mb-3 d-flex flex-column align-items-start"
            style={{ width: "320px" }}
          >
            <label className="form-label text-light" htmlFor="email">
              Email
            </label>
            <input
              onChange={handleChangeLogin}
              className="form-control bg-dark text-white border-secondary"
              type="email"
              value={email}
              name="email"
              id="email"
              required
            />
          </div>

          <div
            className="mb-3 d-flex flex-column align-items-start"
            style={{ width: "320px" }}
          >
            <label className="form-label text-light" htmlFor="password">
              Password
            </label>
            <input
              onChange={handleChangeLogin}
              className="form-control bg-dark text-white border-secondary"
              type="password"
              value={password}
              name="password"
              id="password"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{
              background: "#007bff",
              borderColor: "#007bff",
            }}
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
