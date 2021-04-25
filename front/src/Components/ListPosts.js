import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ListPosts = (props) => {
  const { posts } = props;

  const renderPosts = () => {
    let res = [];
    let i = 0;
    for (let p of posts) {
      let replies = 0;
      if (p.comments) {
        replies = p.comments.length;
      }
      let postDate = new Date(p.createdAt);
      let dateToShow = postDate.toLocaleString();
      res.push(
        <div className="forum-item active" key={"Posts" + i}>
          <div className="card-body py-3" style={{height: "3.5rem"}}>
            <div className="row no-gutters align-items-center">
              <div className="col-md-2">
                <p>{p.category}</p>
              </div>
              <div className="col">
                <Link
                  to={{
                    pathname: `/post/${p._id}`,
                  }}
                >
                  <p className="forum-item-title">{p.title}</p>
                </Link>
              </div>
              <div className="d-none d-md-block col-4">
                <div className="row no-gutters align-items-center">
                  <div className="col-4">{replies}</div>
                  <div className="col-8">{dateToShow}</div>
                </div>
              </div>
            </div>
          </div>
          <hr className="m-0" />
        </div>
      );
      i += 1;
    }
    return res;
  };

  return <div className="ListPosts">{renderPosts()}</div>;
};

ListPosts.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default ListPosts;
