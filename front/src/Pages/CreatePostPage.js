import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/post.css";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [cat, setCat] = useState("");
  const [content, setContent] = useState("");

  const user = localStorage.getItem("user");
  if (user === null) {
    alert("Pleae sign in first!");
    window.location.href = "/login";
  }

  const createPost = async (event) => {
    event.preventDefault();
    if (title === "" || cat === "") {
      alert("Post must have a title and category.");
    } else if (title.length > 50) {
      alert("Your title is too long, please keep it short and concise.");
    } else {
      const resRaw = await fetch("/createPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          category: cat,
          content: content,
        }),
      });

      const res = await resRaw.json();
      if (res.p_id) {
        window.location.href = `/post/${res.p_id}`;
      } else {
        window.location.href = "/";
      }
    }
  };

  return (
    <div className="container" id="postContainer" role="main">
      <div className="row">
        <h3 className="center-block text-center postFormTitle">Create Post</h3>
        <div className="col-md-8 col-md-offset-2">
          <form action="">
            <div className="form-group">
              <label htmlFor="title">Title *</label>

              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                className="form-select form-control"
                id="category"
                value={cat}
                name="category"
                onChange={(evt) => {
                  setCat(evt.target.value);
                }}
              >
                <option value="">Category</option>
                <option value="Study">Study</option>
                <option value="Video Game">Video Games</option>
                <option value="Outdoor Activities">Outdoor Activities</option>
                <option value="Online Activities">Online Activities</option>
              </select>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                rows="5"
                className="form-control"
                id="description"
                name="description"
                aria-label="description"
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>

            <p>
              <br />
              <span className="require">*</span> - required fields
            </p>

            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={createPost}
                id="createPost"
              >
                Create
              </button>
              <Link
                to={{
                  pathname: `/`,
                }}
              >
                <button className="btn btn-default" id="cancel">
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
