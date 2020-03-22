import React from "react";

const RecordItem = ({ label, value, valueClass }) => {
  return (
    <div className="row">
      <div className="twelve columns">
        <h5 className={`u-pull-left`}>{label}</h5>
        <h5 className={`u-pull-right ${valueClass}`}>{value}</h5>
      </div>
    </div>
  )
}

export default RecordItem
