import React from "react";
import { Link } from "react-router-dom";
import "../styles/editclosebutton.css";

const EditAndCloseButton = (props) => {
  const { post, userid } = props;

  const closePost = async () => {
    await fetch("/closePost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: post._id,
      }),
    }).then(() => {
      window.location.reload();
    });
  };

  if (post.userId === userid) {
    if (post.open) {
      return (
        <div>
          <Link
            to={{
              pathname: `/editPost/${post._id}`,
            }}
          >
            <button
              type="button"
              className="btn btn-outline-warning"
              id="editButton"
            >
              Edit
            </button>
          </Link>
          <button
            type="button"
            className="btn btn-outline-danger"
            id="closeButton"
            data-bs-toggle="modal"
            data-bs-target="#closePostModal"
          >
            Close
          </button>
          <div
            className="modal fade"
            id="closePostModal"
            tabIndex="-1"
            aria-labelledby="closePostModal"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Close your current post</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p>
                    Once you close your post, you can't reopen it again. Your
                    post won't show in search result. Are you sure you would
                    like to close your post?
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    id="closeCancel"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    id="closePostButton"
                    onClick={closePost}
                  >
                    Close Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  } else {
    return <div></div>;
  }
};

export default EditAndCloseButton;
