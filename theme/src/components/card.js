import React from "react";
import { Link } from "gatsby";

// const cmsURL = "https://cms.coursemaker.io";

let IMAGE_PLACEHOLDER = "https://picsum.photos/300/300";

const Card = ({ course }) => {
	// if (course.cover_photo.url) {
	// 	IMAGE_PLACEHOLDER = cmsURL + course.cover_photo.url;
	// }

	return (
		<Link
			to={`courses${course.slug}`}
			className="block overflow-hidden bg-white border-t border-gray-200 rounded-lg shadow md:shadow-md transition transition-shadow duration-300 hover:shadow-lg"
		>
			<div className="md:flex">
				<img
					className="object-cover w-full h-40 md:h-64 md:w-1/2"
					src={IMAGE_PLACEHOLDER}
					alt={IMAGE_PLACEHOLDER}
				/>
				<div className="p-6 md:px-10 md:py-8 md:w-1/2">
					<h4 className="mb-1 text-xl font-semibold">{course.title}</h4>
					<h4 className="mb-6 font-normal text-gray-900">
						By
					</h4>
					<p className="font-light leading-relaxed text-gray-700">
						{course.description_overview}
					</p>
					<div className="mt-4 text-sm btn btn-sm btn-default">Learn more</div>
				</div>
			</div>
		</Link>
	);
};

export default Card;
