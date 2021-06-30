import React, { useState } from "react"; //rfce: react function component export
import "../../styles/RegisterForm.css";
import UnAuthWrapper from "./UnAuthWrapper";
import { message } from "antd";
import { register } from "./api";

function RegisterForm() {
  const [details, setDetails] = useState({
    userName: "",
    account: "",
    password: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    register(details.userName, details.account, details.password)
      .then((res) => {
        console.log(res);
        if (res === "Successfully registered. ") {
          window.location = "/";
        } else {
          message.error(res);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Something went wrong!");
      });
  };

  return (
    <UnAuthWrapper>
      <form className="register" onSubmit={submitHandler}>
        <div className="form-inner">
          <h2>Register</h2>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" id="name" onChange={(e) => setDetails({ ...details, userName: e.target.value })} value={details.userName} />
          </div>
          <div className="form-group">
            <label htmlFor="account">Account:</label>
            <input type="email" name="account" id="account" onChange={(e) => setDetails({ ...details, account: e.target.value })} value={details.account} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" onChange={(e) => setDetails({ ...details, password: e.target.value })} value={details.password} />
          </div>
          <input type="submit" value="REGISTER" />
          <button
            onClick={() => {
              window.location = "/login";
            }}
          >
            Login
          </button>
        </div>
      </form>
    </UnAuthWrapper>
  );
}

export default RegisterForm;
