import React, { useState } from "react"; //rfce: react function component export
import "../../styles/LoginForm.css";

import UnAuthWrapper from "./UnAuthWrapper";
import { login } from "./api";

function LoginForm() {
  const [error, setError] = useState("");
  const [details, setDetails] = useState({ account: "", password: "" });
  const submitHandler = (e) => {
    e.preventDefault();
    login(details.account, details.password)
      .then((res) => {
        if (res === "Login.") window.location = "/resume";
      })
      .catch((err) => {
        setError("Details do not match!");
      });
  };
  return (
    <UnAuthWrapper>
      <form className="login" onSubmit={submitHandler}>
        <div className="form-inner">
          <h2>Login</h2>
          {error != "" ? <div className="error">{error}</div> : ""}
          <div className="form-group">
            <label htmlFor="account">Account:</label>
            <input type="email" name="account" id="account" onChange={(e) => setDetails({ ...details, account: e.target.value })} value={details.account} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" onChange={(e) => setDetails({ ...details, password: e.target.value })} value={details.password} />
          </div>
          <div>
            <input type="submit" value="LOGIN" />
            <button
              onClick={() => {
                window.location = "/register";
              }}
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </UnAuthWrapper>
  );
}

export default LoginForm;
