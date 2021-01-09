import React, { useEffect } from 'react';
import { Link, navigate } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import _ from 'lodash';
import Markdown from '../helpers/StrapiMarkdown/Markdown';

import 'katex/dist/katex.min.css';

import LayoutLecture from '../components/layout-lecture';
import Breadcrumbs from '../components/course-breadcrumbs';
import Video from '../components/video';
import { isAuthorized } from '../auth/auth';
import { bakeLocalStorage, readLocalStorage } from '../helpers/storage';

const Lecture = ({ pageContext = {} }) => {
    useEffect(() => {
        if (!isAuthorized(pageContext.course.id)) navigate(`/courses${pageContext.course.slug}checkout`);
    });
    const currentCourse = pageContext.course;
    const { lecture } = pageContext;

    let schoolThemeStyle = pageContext.school?.schoolThemeStyle;
    if (!schoolThemeStyle) {
        schoolThemeStyle = {
            primaryColor: 'blue',
            secondaryColor: 'blue',
        };
    }

    let allLectures;
    if (currentCourse == null || currentCourse?.sections === undefined || currentCourse?.sections.length === 0) {
        allLectures = [];
    } else {
        allLectures = currentCourse?.sections
            ?.map((section) => {
                if (section.lectures.length) {
                    return _.orderBy(
                        section?.lectures,
                        section?.lectures?.[0].hasOwnProperty('order') ? 'order' : 'id',
                        'asc'
                    ).map((item) => item);
                }
                return section.lectures.map((item) => item);
            })
            .flat(1);
    }
    let nextLecture;
    let prevLecture;

    allLectures.forEach((item, i) => {
        if (item.id === lecture.id) {
            if (i <= allLectures.length - 1) nextLecture = allLectures[i + 1];
            if (i > 0) prevLecture = allLectures[i - 1];
            if (i === 0) prevLecture = false;
            if (i === allLectures.length - 1) nextLecture = false;
        }
    });
    let lecture_body;
    if (lecture.body)
        // local source
        lecture_body = <MDXRenderer>{lecture.body}</MDXRenderer>;
    // strapi
    else lecture_body = <Markdown source={lecture.body_markdown} />;

    const addLectureToComplete = async (lecture) => {
        const state = readLocalStorage(currentCourse.slug);
        const newState = {
            items: [...((state && state?.items) || [])],
        };

        const exists = newState?.items?.some((item) => item?.id === lecture?.id);

        if (exists) newState.items = newState?.items.map((item) => (item?.id === lecture?.id ? { ...item } : item));
        else newState.items = [...newState.items, { id: lecture?.id }];

        bakeLocalStorage(currentCourse.slug, newState);
    };

    return (
        <LayoutLecture
            schoolThemeStyle={schoolThemeStyle}
            pageContext={pageContext}
            lecture={lecture}
            lectureList={allLectures}
            totalLectures={allLectures.length}
            currentCourse={currentCourse}
        >
            {/* video */}
            {<Video videoID={lecture?.video_id} />}

            {/* course header */}
            <div className="pt-5 border-b border-gray-300">
                <div className="container lg:max-w-full">
                    <Breadcrumbs
                        school={pageContext.school}
                        course={currentCourse}
                        lecture={lecture}
                        schoolThemeStyle={schoolThemeStyle}
                    />
                    <div className="items-end justify-between pt-4 pb-6 lg:flex">
                        <div>
                            <h2 className="leading-tight">{lecture.title}</h2>
                        </div>

                        {/* .controls */}
                        <div className="flex mt-5 controls space-x-6 lg:mt-0">
                            {prevLecture && prevLecture?.order ? (
                                <Link to={`../${prevLecture.id}${prevLecture.order}`} className="btn btn-gray">
                                    Previous
                                </Link>
                            ) : (
                                <Link to={`../${prevLecture.id}`} className="btn btn-gray">
                                    Previous
                                </Link>
                            )
                            }
                            {nextLecture && nextLecture?.order ? (
                                <Link
                                    onClick={async () => {
                                        await addLectureToComplete(nextLecture);
                                    }}
                                    to={`../${nextLecture.id}${nextLecture.order}`}
                                    className={`btn bg-${schoolThemeStyle.primaryColor}-500 text-white`}
                                >
                                    Next
                                </Link>
                            ) : (
                                <Link
                                    onClick={async () => {
                                        await addLectureToComplete(nextLecture);
                                    }}
                                    to={`../${nextLecture.id}`}
                                    className={`btn bg-${schoolThemeStyle.primaryColor}-500 text-white`}
                                >
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
                        {lecture_body}
                    </div>
                </div>
            </div>
        </LayoutLecture>
    );
};

export default Lecture;
