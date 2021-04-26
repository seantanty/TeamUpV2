import React, { useState, useEffect } from "react";
import "../styles/dashboard.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tabs";

import Count from "../Components/Count.js";
import ListPostsUser from "../Components/ListPostsUser.js";
import DashboardCardHeader from "../Components/DashboardCardHeader.js";

const DashboardPage = () => {
  const [postCount, setPostCount] = useState(0);
  const [teamupCount, setTeamedCount] = useState(0);
  const [interestCount, setInterestCount] = useState(0);
  const [posted, setPosted] = useState([]);
  const [interested, setInterested] = useState([]);
  const [teamuped, setTeamuped] = useState([]);
  const [key, setKey] = useState("posted");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user === null) {
      alert("Pleae sign in first!");
      window.location.href = "/login";
    }

    const username = JSON.parse(user).username;

    const getUser = async () => {
      try {
        const resRaw = await fetch("/getUserByName", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
          }),
        });
        const res = await resRaw.json();
        console.log("res", res);
        //set counts
        setInterestCount(res.interested.length);
        setPostCount(res.posted.length);
        setTeamedCount(res.teamuped.length);

        //set posts
        const userPosted = res.posted.sort((a, b) =>
          Date(a.createdAt) > Date(b.createdAt) ? 1 : -1
        );
        const userInterested = res.interested.sort((a, b) =>
          Date(a.createdAt) > Date(b.createdAt) ? 1 : -1
        );
        const userTeamuped = res.teamuped.sort((a, b) =>
          Date(a.createdAt) > Date(b.createdAt) ? 1 : -1
        );
        setPosted(userPosted);
        setInterested(userInterested);
        setTeamuped(userTeamuped);
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, []);

  return (
    <div className="containter" role="main">
      <div className="countsContainer">
        <Count label={"posted"} count={postCount} />
        <Count label={"interested"} count={interestCount} />
        <Count label={"teamuped"} count={teamupCount} />
      </div>

      <div className="container-fluid mt-100">
        <Tabs className="tab-pane" activeKey={key} onSelect={(k) => setKey(k)}>
          <Tab className="tabTitle" eventKey="posted" title="Posted">
            <div className="col-md-12">
              <div className="card mb-3" id="postsCard">
                <DashboardCardHeader></DashboardCardHeader>
                <ListPostsUser posts={posted}></ListPostsUser>
              </div>
            </div>
          </Tab>
          <Tab className="tabTitle" eventKey="interested" title="Interested">
            <div className="col-md-12">
              <div className="card mb-3">
                <DashboardCardHeader></DashboardCardHeader>
                <ListPostsUser posts={interested}></ListPostsUser>
              </div>
            </div>
          </Tab>
          <Tab className="tabTitle" eventKey="teamuped" title="Teamuped">
            <div className="col-md-12">
              <div className="card mb-3">
                <DashboardCardHeader></DashboardCardHeader>
                <ListPostsUser posts={teamuped}></ListPostsUser>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardPage;
