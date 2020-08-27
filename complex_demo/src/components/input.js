import React from "react";

const Input = ({ type, label, placeholder }) => {
	return (
		<div className="input-field">
			<label className="block mb-2 font-semibold text-gray-700" htmlFor={type}>
				{label}
			</label>
			<input
				className="w-full px-3 py-2 font-light bg-gray-100 border border-gray-300 rounded"
				id={type}
				type={type}
				placeholder={placeholder}
				required
			/>
		</div>
	);
};

export default Input;
