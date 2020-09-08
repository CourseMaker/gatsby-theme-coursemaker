import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Courses from "../components/courses";

const CoursesPage = ({data}) => {
	const { school } = data.cms.siteBuild;

	return (
		<Layout>
			<Courses courses={school.courses} />
		</Layout>
	);
};

export default CoursesPage;

export const query = graphql`
	query CoursesPage($build_id: ID!) {
		cms {
			siteBuild(id: $build_id) {
				school {
					courses {
						id
						author_display {
							title
							photo {
								url
							}
						}
						cover_photo {
							url
						}
						created_at
						enrolment_enabled
						description_overview
						subtitle
						title
					}
				}
			}
		}
	}
`;
