import React from "react";

const DashboardCardHeader = () => {
  return (
    <div className="card-header pr-0 pl-0">
      <div className="row no-gutters align-items-center w-100">
        <div className="col-md-3 font-weight-bold pl-3">Categories</div>
        <div className="col font-weight-bold pl-3">Titles</div>
        <div className="d-none d-md-block col-4 text-muted">
          <div className="row no-gutters align-items-center">
            <div className="col-10">Last update</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCardHeader;
