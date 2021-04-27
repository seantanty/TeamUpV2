import React, { useState, useEffect } from "react";

const LikeButton = (props) => {
  const { post, userid } = props;
  const [like, setLike] = useState(false);

  function clickLike() {
    setLike(!like);
  }

  useEffect(() => {
    if (post.interested) {
      for (let i = 0; i < post.interested.length; i++) {
        if (post.interested[i].userId === userid) {
          setLike(true);
          break;
        }
      }
    }
  }, [post]);

  const likePost = async () => {
    await fetch("/likePost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post: post,
      }),
    }).then(() => {
      clickLike();
      window.location.reload();
    });
  };

  const unlikePost = async () => {
    await fetch("/unlikePost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: post._id,
      }),
    }).then(() => {
      clickLike();
      window.location.reload();
    });
  };

  if (post.open && userid) {
    if (!like) {
      return (
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={likePost}
        >
          <i className="fa fa-heart-o"></i>
          <span className="ml-1">Count me in!</span>
        </button>
      );
    } else {
      return (
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={unlikePost}
        >
          <i className="fa fa-heart like-color"></i>
          <span className="ml-1">Don't count me in!</span>
        </button>
      );
    }
  } else {
    return <div></div>;
  }
};

export default LikeButton;
