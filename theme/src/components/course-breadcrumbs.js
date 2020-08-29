import React from "react";
import { Link } from "gatsby";

const CourseBreadcumbs = ({ school, course, lecture }) => {
	return (
		<div className="inline-flex flex-wrap items-center text-sm text-gray-500" to="/">
			<svg
				className="w-5"
				viewBox="0 0 32 32"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fill="#a0aec0"
					d="M28 14H8.8l4.62-4.62c.394-.394.58-.864.58-1.38 0-.984-.813-2-2-2-.531 0-.994.193-1.38.58l-7.958 7.958C2.334 14.866 2 15.271 2 16s.279 1.08.646 1.447l7.974 7.973c.386.387.849.58 1.38.58 1.188 0 2-1.016 2-2 0-.516-.186-.986-.58-1.38L8.8 18H28a2 2 0 000-4z"
				/>
			</svg>
			<Link to="/" className="inline-block ml-3 link">
				{school.name}
			</Link>
			<span className="mx-1">/</span>
			{lecture ? (
				<Link to={`../../../${course.title}/curriculum`} className="link">
					{course.title}
				</Link>
			) : (
				<span>{course.title}</span>
			)}
			{lecture && <span className="mx-1">/</span>}
			{lecture && <span>{lecture.title}</span>}
		</div>
	);
};

export default CourseBreadcumbs;
