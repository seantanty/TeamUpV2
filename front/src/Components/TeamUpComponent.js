import React, { useState } from "react";
import "../styles/teamupcomponent.css";

const TeamUpComponent = (props) => {
  const { post, userid } = props;
  const [teammates] = useState([]);

  const createTeam = async () => {
    if (teammates.length < 2) {
      alert("A team should have at least two people.");
    } else {
      await fetch("/createTeam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post: post,
          teamMembers: teammates,
        }),
      }).then(() => {
        window.location.reload();
      });
    }
  };

  const checkMark = (e) => {
    if (e.target.checked) {
      teammates.push(e.target.id);
    } else {
      let index = teammates.indexOf(e.target.id);
      if (index > -1) {
        teammates.splice(index, 1);
      }
    }
  };

  function renderCandidates() {
    return post.interested.map((candidate, index) => (
      <div className="form-check" key={candidate.userId + index}>
        <input
          className="form-check-input"
          onChange={(evt) => {
            checkMark(evt);
          }}
          type="checkbox"
          value=""
          id={candidate.username}
        />
        <label className="form-check-label">{candidate.username}</label>
      </div>
    ));
  }

  if (userid && userid === post.userId) {
    if (post.open || (post.groupMember && post.groupMember.length === 0)) {
      return (
        <div>
          <button
            type="button"
            className="btn btn-primary"
            id="teamupButton"
            data-bs-toggle="modal"
            data-bs-target="#createTeamModal"
          >
            Team up!
          </button>
          <div
            className="modal fade"
            id="createTeamModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Please select your team members
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">{renderCandidates()}</div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    id="createteamButton"
                    onClick={createTeam}
                  >
                    Create Team
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <button
          type="button"
          className="btn btn-secondary"
          disabled
          style={{ marginLeft: "10px" }}
        >
          Team created
        </button>
      );
    }
  } else {
    return <div></div>;
  }
};

export default TeamUpComponent;
