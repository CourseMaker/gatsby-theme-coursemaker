import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Layout from "../components/layout";
import Courses from "../components/courses";

const CoursesPage = () => {
	const { cms } = useStaticQuery(query);
	const { school } = cms.siteBuilds[0];

	return (
		<Layout>
			<Courses courses={school.courses} />
		</Layout>
	);
};

export default CoursesPage;

const query = graphql`
	query CoursesPage {
		cms {
			siteBuilds {
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
