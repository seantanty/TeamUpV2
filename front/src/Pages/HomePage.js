import React, { useState, useEffect, useRef } from "react";
import ListPosts from "../Components/ListPosts.js";
import PaginationComponent from "../Components/PaginationComponent.js";
import "../styles/home.css";

function HomePage() {
  let [posts, setPosts] = useState([]);
  let [query, setQuery] = useState("");
  let [cat, setCat] = useState("");
  let [page, setPage] = useState(0);
  let [total, setTotal] = useState(0);
  let [reload, setReload] = useState(0);

  const inSearchRef = useRef();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const resRaw = await fetch("/getPosts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ category: cat, query: query, page: page }),
        });
        // const resRaw = await fetch(
        //   `./getPosts?category=${cat}&query=${query}&page=${page}`
        // );
        const res = await resRaw.json();
        setPosts(res.posts);
        setTotal(res.total);
      } catch (error) {
        console.error(error);
      }
    };
    getPosts();
  }, [page, reload, query, cat]);

  return (
    <div className="container" id="container" role="main">
      <div className="row">
        <div className="col-md-8" id="searchBarBox">
          <div className="input-group">
            <div className="input-group-btn search-panel">
              <select
                aria-label="Category"
                className="form-select form-control"
                onChange={(evt) => {
                  setCat(evt.target.value);
                }}
              >
                <option value="">Category</option>
                <option value="Study">Study</option>
                <option value="Video Game">Video Games</option>
                <option value="Outdoor">Outdoor Activities</option>
                <option value="Online">Online Activities</option>
              </select>
            </div>
            <input
              ref={inSearchRef}
              className="form-control"
              type="text"
              placeholder="Search topics or keywords"
              id="searchInput"
              onChange={(evt) => {
                setQuery(evt.target.value);
                setPage(0);
              }}
              onKeyPress={(evt) => {
                if (evt.code === "Enter") {
                  setReload(reload + 1);
                  setPage(0);
                }
              }}
              value={query}
            />
            <span className="input-group-btn">
              <button
                id="searchButton"
                aria-label="search"
                className="btn btn-success"
                type="submit"
                onClick={() => {
                  setReload(reload + 1);
                  setPage(0);
                }}
              >
                <span className="fa fa-search"></span>
              </button>
            </span>
          </div>
        </div>
      </div>

      <div className="container-fluid mt-100">
        <div className="row">
          <div className="col-md-12">
            <div className="card mb-3" id="postsCard">
              <div className="card-header pr-0 pl-0">
                <div className="row no-gutters align-items-center w-100">
                  <div className="col-md-2 font-weight-bold pl-3 postsColTitle">
                    Category
                  </div>
                  <div className="col font-weight-bold pl-3 postsColTitle">
                    Titles
                  </div>
                  <div className="d-none d-md-block col-4 text-muted">
                    <div className="row no-gutters align-items-center">
                      <div className="col-4 postsColTitle">Replies</div>
                      <div className="col-8 postsColTitle">Last update</div>
                    </div>
                  </div>
                </div>
              </div>
              <ListPosts posts={posts}></ListPosts>
            </div>
          </div>
        </div>
      </div>
      <div className="Pagination">
        <PaginationComponent
          total={total}
          page={page}
          onChangePage={setPage}
        ></PaginationComponent>
      </div>
    </div>
  );
}

export default HomePage;
