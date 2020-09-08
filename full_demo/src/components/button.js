import React from "react";
import { Link } from "gatsby";

const Button = ({ text, color, bg, size = 'lg', to = '/' }) => {
	let textColor = 'text-' + color;
	let bgColor = 'bg-' + bg;
	if(color !== 'black' && color !== 'white') {
		textColor += '-500';
	}
	if(bg !== 'white' && bg !== 'black' && bg !== 'orange') {
		bgColor += '-500';
	}

	return (
		<Link to={to} className={`btn btn-${size} 
			${textColor} ${bgColor}`} >
			{text}
		</Link>
	)
}

export default Button;
