import React from "react";
const CheckBox = props => (
  <div id={props.id} className="checkbox-div">
    <div
      onClick={props.props}
      checked={!props.checked}
      id={props.id}
      className="checkbox-in-div"
    >
      <span
        id={props.id}
        className={!props.checked ? "checkbox" : "checkbox checked"}
        type="checkbox"
      />
      <p id={props.id} className="transfer-filter">
        {props.text}
      </p>
    </div>
    <p onClick={props.func} id={props.id} className="transfer-filter-hidden">
      {props.id !== 666 ? "ТОЛЬКО" : ""}
    </p>
  </div>
);
export default CheckBox;
