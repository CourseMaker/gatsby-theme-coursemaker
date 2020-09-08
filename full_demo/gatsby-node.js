const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const indexTemplate = path.resolve("./src/templates/index.js");
  const coursesTemplate = path.resolve("./src/templates/courses.js");

  const lectureTemplate = path.resolve("./src/templates/lecture.js");
  const courseTemplate = path.resolve("./src/templates/course.js");
  const curriculumTemplate = path.resolve("./src/templates/course-curriculum.js");

	const { createPage } = actions;
	const { errors, data } = await graphql(
		`
      query RootQuery($build_id: ID!) {
				cms {
					siteBuild(id: $build_id) {
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
		`,
	{ build_id: process.env.SITE_BUILD_ID});

	if (errors) {
		throw errors;
	}

  createPage({
			path: `/`,
      component: indexTemplate,
			context: {
				build_id: process.env.SITE_BUILD_ID,
			},
  });

  createPage({
			path: `/courses`,
      component: coursesTemplate,
			context: {
				build_id: process.env.SITE_BUILD_ID,
			},
  });

	const courses = data.cms.siteBuild.school.courses;
	courses.forEach((course) => {
		// courses
		createPage({
			path: `/courses/${course.title}`,
      component: courseTemplate,
			context: {
				id: course.id,
				build_id: process.env.SITE_BUILD_ID,
			},
		});

		// curriculums
		createPage({
			path: `/courses/${course.title}/curriculum`,
			component: curriculumTemplate,
			context: {
				id: course.id,
				build_id: process.env.SITE_BUILD_ID,
			},
		});

		// lectures
		course.sections.forEach((section) => {
			section.lectures.forEach((lecture) => {
				createPage({
					path: `/courses/${course.title}/lectures/${lecture.id}`,
					component: lectureTemplate,
					context: {
						course_id: course.id,
            section_id: section.id,
						id: lecture.id,
				    build_id: process.env.SITE_BUILD_ID,
					},
				});
			})
		})
	});

};
