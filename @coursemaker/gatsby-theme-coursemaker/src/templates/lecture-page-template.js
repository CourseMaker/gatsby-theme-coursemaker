import React, { useEffect } from 'react';
import { Link, navigate } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import 'katex/dist/katex.min.css';

import Markdown from '../helpers/StrapiMarkdown/Markdown';
import LayoutLecture from '../components/layout-lecture';
import Breadcrumbs from '../components/course-breadcrumbs';
import Video from '../components/video';
import { isAuthenticated, login } from '../auth/auth';
import { bakeLocalStorage, readLocalStorage } from '../helpers/storage';

const LectureTemplate = ({ pageContext = {} }) => {
    useEffect(() => {
        if (!isAuthenticated()) {
            login()
            return <p>Redirecting to login...</p>
        };
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

    const allLectures = pageContext?.allLectures;
    const nextLecture = pageContext?.nextLecture;
    const previousLecture = pageContext?.previousLecture;

    let nextLectureSlug = '../curriculum';
    if (nextLecture && nextLecture.hasOwnProperty('order') && nextLecture.order !== null) {
        nextLectureSlug = `${nextLecture.id}${nextLecture.order}`;
    } else if (nextLecture && !nextLecture?.order) {
        nextLectureSlug = `${nextLecture.id}`;
    }

    let previousLectureSlug = '../curriculum';
    if (previousLecture && previousLecture.hasOwnProperty('order') && previousLecture.order !== null) {
        previousLectureSlug = `${previousLecture.id}${previousLecture.order}`;
    } else if (previousLecture && !previousLecture?.order) {
        previousLectureSlug = `${previousLecture.id}`;
    }

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
                            <Link to={`../${previousLectureSlug}`} className="btn btn-gray">
                                Previous
                            </Link>
                            <Link
                                onClick={async () => {
                                    await addLectureToComplete(nextLecture);
                                }}
                                to={`../${nextLectureSlug}`}
                                className={`btn bg-${schoolThemeStyle?.primaryColor}-500 text-white`}
                            >
                                Next
                            </Link>
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

export default LectureTemplate;
