import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/auth.css";

const LoginPage = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const login = async (event) => {
    event.preventDefault();
    const resRaw = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    // check login status and rediect
    console.log("redirected?", resRaw.redirected);
    if (resRaw.redirected) {
      alert("Incorrect username or password!");
    } else {
      const res = await resRaw.json();
      const userInfo = JSON.stringify({
        username: username,
        userid: res.userid,
      });
      // save user info to local storage
      localStorage.setItem("user", userInfo);
      window.location.href = "/";
    }
  };

  return (
    <div className="container" role="main">
      <div className="card" id="card_login">
        <div className="form-floating my-3">
          <input
            type="text"
            className="form-control"
            name="username"
            id="username"
            aria-label="username"
            onChange={(e) => setUserName(e.target.value)}
          />
          <label id="userlabel" htmlFor={username}>
            Email address
          </label>
        </div>

        <div className="form-floating my-3">
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder=""
            id="password"
            aria-label="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor={password}>Password</label>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          id="btn_signin"
          onClick={login}
        >
          Sign in
        </button>
        <br />
        <br />
        <p className="message">
          Not Registered? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
