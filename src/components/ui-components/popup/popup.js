import React from 'react';
import "./popup.scss";

const Popup = (props) => {
  return (
    <div className="popup">
      <span className="popup-close" onClick={props.close()}>X</span>
      <span className="popup-text">{props.text}</span>
    </div>
  );
}
export default Popup;
