import React from "react";
import { Link, graphql } from "gatsby";
import ReactMarkdown from "react-markdown";
import LayoutLecture from "../components/layout-lecture";
import Breadcrumbs from "../components/course-breadcrumbs";

const Lecture = ({ data }) => {
	const course = data.currentCourse;
	const school = 'school';

	let lecture = false;
	let totalLectures = 0;

	// get lecture object
	course.Sections.forEach((section) => {
		section.Lectures.forEach((item) => {
			if (!lecture) {
				lecture = item;
			}
		});
	});

	// get all lectures to show in the sidebar
	let allSections = "";
	let allLectures = [];

	// match current course with all courses
	course.Sections.forEach(function (section) {
		allLectures = allLectures.concat(section.Lectures);
		totalLectures += section.Lectures.length;
	});

	let nextLecture,
		prevLecture = "";
	allLectures.forEach(function (item, i) {
		if (item.id === lecture.id) {
			if (i <= allLectures.length - 1) {
				nextLecture = allLectures[i + 1];
			}
			if (i > 0) {
				prevLecture = allLectures[i - 1];
			}
			if (i === 0) {
				prevLecture = false;
			}
			if (i === allLectures.length - 1) {
				nextLecture = false;
			}
		}
	});

	return (
		<LayoutLecture
			lecture={lecture}
			sections={allSections}
			totalLectures={totalLectures}
		>
			{/* video */}
			<div className="bg-black video-wrapper">
				<iframe
					title="video"
					width="560"
					height="315"
					src="https://www.youtube.com/embed/dXu_m1LVaYA"
					frameBorder="0"
					allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				></iframe>
			</div>

			{/* course header */}
			<div className="pt-5 border-b border-gray-300">
				<div className="container lg:max-w-full">
					<Breadcrumbs school={school} course={course} lecture={lecture} />
					<div className="items-end justify-between pt-4 pb-6 lg:flex">
						<div>
							<h2 className="leading-tight">{lecture.title}</h2>
							<div className="font-light text-gray-600 md:text-2xl">
								We need a lecture subtitle field
							</div>
						</div>

						{/* .controls */}
						<div className="flex mt-5 controls space-x-6 lg:mt-0">
							{prevLecture && (
								<Link to={`../${prevLecture.id}`} className="btn btn-gray">
									Previous
								</Link>
							)}
							{nextLecture && (
								<Link to={`../${nextLecture.id}`} className="btn btn-default">
									Next
								</Link>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* course content */}
			<div className="w-full py-12 mx-auto lg:py-16 lg:w-9/12">
				<div className="container">
					<div className="font-light leading-relaxed text-gray-700 description space-y-4 lg:w-11/12">
						<ReactMarkdown source={lecture.description} />
					</div>
				</div>
			</div>

		</LayoutLecture>
	);
};

export default Lecture;

export const query = graphql`
	query($id: String!) {
		currentCourse: course(id: { eq: $id }) {
			id
			title
			slug
			Sections {
				id
				slug
				title
				Lectures {
					id
					slug
					title
				}
			}
		}
	}
`;
