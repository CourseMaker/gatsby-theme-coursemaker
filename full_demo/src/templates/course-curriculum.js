import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Section from "../components/section";
import Breadcrumbs from "../components/course-breadcrumbs";

const Curriculum = ({ data }) => {
	const school = data.cms.siteBuild.school;
	const course = data.cms.siteBuild.school.courses[0];
	return (
		<Layout>
			<section className="pt-5">
				<div className="container mx-auto">
					<Breadcrumbs school={school} course={course} />
				</div>
			</section>

			<section id="course" className="pt-12 pb-12 lg:py-20 lg:pb-32">
				<div className="container mx-auto">
					<div className="mx-auto inner lg:w-8/12">
						<h1 className="leading-tight">{course.title}</h1>
						<div className="mb-4 text-2xl font-light text-gray-600">{course.subtitle}</div>
						<div className="text-lg font-semibold">By {course.author_display.title}</div>

						<h2 className="mt-12 mb-6 leading-tight">
							Curriculum
						</h2>
						<div className="curriculum-list space-y-10">
							{course.sections.map((section) => (
								<Section data={section} size="big" key={section.id} />
							))}
						</div>

					</div>
				</div>
			</section>
		</Layout>
	);
};

export default Curriculum;

export const query = graphql`
	query CurriculumQuery($build_id: ID!, $id: String!) {
		cms {
			siteBuild(id: $build_id) {
				school {
					name
					courses (where: {id: $id}) {
						id
						title
						subtitle
						course_image {
							url
						}
						author_display {
							title
						}
						description_overview
						author {
							id
							username
						}
						sections {
							id
							title
							description
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

