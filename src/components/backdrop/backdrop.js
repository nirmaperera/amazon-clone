import React from "react";
import './backdrop.css';

function Backdrop(props) {
	return (
		<div className="backdrop" onClick={props.click}></div>
	);
}

export default Backdrop;
