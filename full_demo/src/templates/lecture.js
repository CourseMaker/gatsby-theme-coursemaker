import React from "react";
import { Link, graphql } from "gatsby";
import ReactMarkdown from "react-markdown";
import { Stream } from "@cloudflare/stream-react";
import LayoutLecture from "../components/layout-lecture";
import Breadcrumbs from "../components/course-breadcrumbs";

const Lecture = ({ data }) => {
	const school = data.cms.siteBuild.school;
	const course = data.cms.siteBuild.school.courses[0];
  const lecture = course.sections[0].lectures[0];
  const videoID = lecture.video_id; //|| "e42f03212fba34c412243da007c521cf";

  console.log(videoID);
	
  let totalLectures = 0;

	// get all courses to show on the sidebar
	const allCourses = data.cms.siteBuild.school.allcourses;
	let allSections = "";
	let allLectures = [];

	// match current course with all courses
	allCourses.forEach(function (item) {
		if (course.title === item.title) {
			allSections = item.sections;
			item.sections.forEach(function (section) {
				allLectures = allLectures.concat(section.lectures);
				totalLectures += section.lectures.length;
			});
		}
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
			<div className="bg-black video-wrapper" style={{display: "contents"}}>
        <Stream controls src={videoID} />
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
	query LectureQuery($build_id: ID!, $course_id: String!, $section_id: String!, $id: String!) {
		cms {
			siteBuild(id: $build_id) {
				school {
					name
					courses(where: { id: $course_id }) {
						id
						title
						subtitle
						author_display {
							title
						}
						description_overview
						author {
							id
							username
						}
						sections(where: {id: $section_id}) {
							id
							title
							description
							lectures(where: { id: $id }) {
								id
								title
								description
                video_id
							}
						}
					}
					allcourses: courses {
						id
						title
						sections {
							id
							title
							lectures {
								id
								title
							}
						}
					}
				}
			}
		}
	}
`;
