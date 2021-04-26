import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/auth.css";

let regExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const RegisterPage = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  async function register(event) {
    event.preventDefault();
    console.log("username", username);
    console.log("password", password);
    // check valid username and password first
    if (username.match(regExp)) {
      if (password === null || password === "" || password === undefined) {
        alert("Please enter your password.");
        console.log("stay here");
        return false;
      } else {
        const resRaw = await fetch("/checkSameUserName", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: username }),
        });
        const res = await resRaw.json();
        // check registered
        if (res.same === true) {
          alert("This email has been registered already.");
          console.log("stay here");
          return false;
        } else {
          // register
          const resRaw = await fetch("/register", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username,
              password: password,
            }),
          });

          const res = await resRaw.json();
          console.log(res);
          if (res.userid === null) {
            alert("Please enter a valid e-mail address.");
          } else {
            const userInfo = JSON.stringify({
              username: username,
              userid: res.userid,
            });
            // save user info to local storage
            localStorage.setItem("user", userInfo);
            window.location.href = "/";
          }
        }
      }
    } else {
      alert("Please enter a valid e-mail address.");
      return false;
    }
  }

  return (
    <div className="container" role="main">
      <div className="card" id="card_register">
        <div className="form-floating my-3">
          <input
            type="text"
            className="form-control"
            name="username"
            placeholder=""
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
          id="btn_signup"
          onClick={register}
        >
          Sign up
        </button>
        <br />
        <br />
        <p className="message">
          Registered Already? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
