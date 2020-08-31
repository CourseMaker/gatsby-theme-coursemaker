const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const lectureTemplate = path.resolve("./src/templates/lecture.js");
  const courseTemplate = path.resolve("./src/templates/course.js");
  const curriculumTemplate = path.resolve("./src/templates/course-curriculum.js");

	const { createPage } = actions;
	const { errors, data } = await graphql(
		`
      query {
				cms {
					siteBuilds {
						school {
							courses {
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
		`
	);

	if (errors) {
		throw errors;
	}

	const courses = data.cms.siteBuilds[0].school.courses;

	courses.forEach((course) => {
		const courseTitle = course.title;

		// courses
		createPage({
			path: `/courses/${courseTitle}`,
      component: courseTemplate,
			context: {
				title: courseTitle,
			},
		});

		// curriculums
		createPage({
			path: `/courses/${courseTitle}/curriculum`,
			component: curriculumTemplate,
			context: {
				title: courseTitle,
			},
		});

		// lectures
		course.sections.forEach((section) => {
			section.lectures.forEach((lecture) => {
				createPage({
					path: `/courses/${courseTitle}/lectures/${lecture.id}`,
					component: lectureTemplate,
					context: {
						title: courseTitle,
						id: lecture.id,
					},
				});
			})
		})
	});

};
