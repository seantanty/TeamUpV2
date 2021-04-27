import React, { useState, useEffect } from "react";
import ListComments from "../Components/ListComments.js";
import CommentBox from "../Components/CommentBox.js";
import LikeButton from "../Components/LikeButton.js";
import TeamUpComponent from "../Components/TeamUpComponent.js";
import TeamList from "../Components/TeamList.js";
import EditAndCloseButton from "../Components/EditAndCloseButton.js";
import "../styles/individualpost.css";

function IndividualPost(props) {
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [displayCommentBox, setDisplayCommentBox] = useState(false);
  const [showCommentButton, setShowCommentButton] = useState(true);
  let curUserId;
  let curUsername;

  if (localStorage.getItem("user")) {
    curUserId = JSON.parse(localStorage.getItem("user")).userid;
    curUsername = JSON.parse(localStorage.getItem("user")).username;
  }

  function clickComment() {
    if (curUsername) {
      setDisplayCommentBox(!displayCommentBox);
    }
  }

  function convertDate(dateString) {
    let postDate = new Date(dateString);
    return postDate.toLocaleString();
  }

  useEffect(() => {
    const getPostById = async () => {
      try {
        const resRaw = await fetch("/getPostById", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: window.location.pathname.slice(6) }),
        });
        const res = await resRaw.json();
        setPost(res);
        setComments(res.comments);
        if (localStorage.getItem("user")) {
          setShowCommentButton(false);
          console.log(showCommentButton);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getPostById();
  }, [showCommentButton]);

  return (
    <div>
      <div className="container mt-5 bg-white" id="individualpost" role="main">
        <div className="d-flex justify-content-center row">
          <div className="col-md-10">
            <div className="d-flex flex-column">
              <div className="post-section">
                <div className="bg-white p-2">
                  <div className="mt-2">
                    <h4>{post.title}</h4>
                    <h6>Category:{post.category}</h6>
                    <p className="postContent">{post.content}</p>
                  </div>
                  <div className="d-flex flex-row user-info">
                    <div className="d-flex flex-column justify-content-start ml-2">
                      <h6>Posted by: {post.username}</h6>
                      <span className="date">
                        Created at: {convertDate(post.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="form-group bg-white"
                  style={{ marginLeft: "0px" }}
                >
                  <div className="interactions">
                    <LikeButton userid={curUserId} post={post}></LikeButton>
                    <button
                      type="button"
                      className="btn btn-primary"
                      id="comment"
                      onClick={clickComment}
                      disabled={showCommentButton}
                    >
                      <i className="fa fa-commenting-o"></i>
                      <span className="ml-1">Comment</span>
                    </button>
                    <br />
                    <EditAndCloseButton
                      userid={curUserId}
                      post={post}
                    ></EditAndCloseButton>
                    <br />
                    <TeamUpComponent
                      userid={curUserId}
                      post={post}
                    ></TeamUpComponent>
                  </div>
                </div>
                <CommentBox
                  username={curUsername}
                  display={displayCommentBox}
                  post={post}
                ></CommentBox>
              </div>
              <div className="comment-section">
                <br />
                <TeamList
                  username={curUsername}
                  teamMembers={post.groupMember}
                ></TeamList>
                <br />
                <ListComments
                  post={post}
                  userid={curUserId}
                  username={curUsername}
                  comments={comments}
                ></ListComments>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndividualPost;
