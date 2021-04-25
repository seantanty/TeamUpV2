import React from "react";
import "../styles/teamlist.css";

const TeamList = (props) => {
  const { username, teamMembers } = props;

  if (teamMembers !== null && teamMembers !== undefined) {
    if (teamMembers.length && teamMembers.length > 0) {
      if (teamMembers.includes(username)) {
        const renderTeamMembers = () => {
          let res = [];
          let i = 0;
          for (let t of teamMembers) {
            res.push(
              <li className="list-group-item" key={t + i}>
                {t}
              </li>
            );
            i += 1;
          }
          return res;
        };
        return (
          <div className="card">
            <div className="card-body">
              <h5 class="card-title">Team Members</h5>
              <div className="card-body">
                <ol className="list-group list-group-numbered TeamList">
                  {renderTeamMembers()}
                </ol>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="alert alert-info" role="alert" id="alreadyFormed">
            A team has already been formed for this post.
          </div>
        );
      }
    } else {
      return <div></div>;
    }
  } else {
    return <div></div>;
  }
};

export default TeamList;
