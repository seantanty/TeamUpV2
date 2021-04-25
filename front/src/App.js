import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./Pages/HomePage.js";
import LoginPage from "./Pages/LoginPage.js";
import RegisterPage from "./Pages/RegisterPage.js";
import Header from "./Components/Header.js";
import CreatePostPage from "./Pages/CreatePostPage.js";
import DashboardPage from "./Pages/DashboardPage.js";
import IndividualPost from "./Components/IndividualPost.js";
import EditPostPage from "./Pages/EditPostPage.js";
import "./index.css";

function App() {
  return (
    <Router>
      <Header></Header>

      <Switch>
        <Route path="/login">
          <LoginPage></LoginPage>
        </Route>

        <Route path="/register">
          <RegisterPage></RegisterPage>
        </Route>

        <Route path="/" exact>
          <HomePage></HomePage>
        </Route>

        <Route path="/createPost">
          <CreatePostPage></CreatePostPage>
        </Route>

        <Route path="/dashboard">
          <DashboardPage></DashboardPage>
        </Route>

        <Route path="/post/:id">
          <IndividualPost></IndividualPost>
        </Route>

        <Route path="/editPost/:id">
          <EditPostPage></EditPostPage>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
