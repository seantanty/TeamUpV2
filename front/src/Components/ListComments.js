import React from "react";
import PropTypes from "prop-types";
import "../styles/listcomments.css";
import CommentEditAndDeleteButton from "../Components/CommentEditAndDeleteButton.js";

const ListComments = (props) => {
  const { post, comments, userid, username } = props;

  if (comments !== null && comments !== undefined) {
    if (comments.length && comments.length > 0) {
      const renderComments = () => {
        let res = [];
        let i = 0;
        for (let c of comments) {
          let commentDate = new Date(c.createdAt);
          let dateToShow = commentDate.toLocaleString();

          res.push(
            <div className="comment-item active" key={"Comments" + i}>
              <div className="comment mt-4 text-justify float-left">
                <div className="comment card p-3 mt-2 border border-danger">
                  <h6>{c.username}</h6> <span>{dateToShow}</span> <br />
                  <p>{c.content}</p>
                </div>
              </div>
              <br />
              <CommentEditAndDeleteButton
                post={post}
                userid={userid}
                username={username}
                comment={c}
              ></CommentEditAndDeleteButton>
            </div>
          );
          i += 1;
        }
        return res;
      };

      return (
        <div className="bg-white p-2">
          <h5>Comments:</h5>
          <div className="ListComments">{renderComments()}</div>
        </div>
      );
    } else {
      return <div></div>;
    }
  } else {
    return <div></div>;
  }
};

ListComments.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default ListComments;
