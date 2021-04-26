import React from "react";
import PropTypes from "prop-types";
import "../styles/count.css";

const Count = (props) => {
  const { count, label } = props;

  return (
    <div className="allCount">
      <div className="count">{count}</div>
      <div className="label">{label}</div>
    </div>
  );
};

Count.propTypes = {
  count: PropTypes.number,
  label: PropTypes.string,
};

export default Count;
