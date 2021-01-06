import React from "react";

const Icon = ({
	source,
	color = 'blue'
}) => (
	<div className={`flex items-center justify-center w-20 h-20 mx-auto mb-1 bg-${color}-200 rounded-full md:w-24 md:h-24 icon-wrapper`}>
		<img class="w-12 md:w-16" src={source} alt="Icon" />
  </div>
);

export default Icon;
