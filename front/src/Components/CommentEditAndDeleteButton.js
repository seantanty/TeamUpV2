import React, { useState } from "react";
import CommentBox from "../Components/CommentBox.js";
import "../styles/commentbutton.css";

const CommentEditAndDeleteButton = (props) => {
  const { post, userid, username, comment } = props;
  const [displayCommentBox, setdisplayCommentBox] = useState(false);

  function clickComment() {
    if (userid) {
      setdisplayCommentBox(!displayCommentBox);
    }
  }

  const deleteComment = async (cid) => {
    await fetch("/deleteComment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: post._id,
        commentId: cid,
      }),
    }).then(() => {
      window.location.reload();
    });
  };

  if (userid && userid === comment.userId) {
    return (
      <div>
        <button
          type="button"
          className="btn btn-warning commentEdit"
          onClick={(e) => clickComment()}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-danger commentDelete"
          onClick={(e) => deleteComment(comment._id)}
        >
          Delete
        </button>
        <CommentBox
          username={username}
          display={displayCommentBox}
          post={post}
          cid={comment._id}
        ></CommentBox>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default CommentEditAndDeleteButton;
