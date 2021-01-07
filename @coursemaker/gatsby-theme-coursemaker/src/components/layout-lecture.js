import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';
import Header from './header';
import Footer from './footer';
import Section from './section';
import { bakeLocalStorage, readLocalStorage } from '../helpers/storage';

const LayoutLecture = ({
    children,
    lecture,
    lectureList,
    // sections,
    totalLectures,
    currentCourse,
    pageContext,
    schoolThemeStyle = null,
}) => {
    let pageThemeStyle = { primaryColor: 'blue' };
    if (schoolThemeStyle) {
        pageThemeStyle = schoolThemeStyle;
    }
    const { slug } = currentCourse;
    const course = readLocalStorage(slug);
    const completedLectures = course?.items?.length;
    const progress = completedLectures >= 0 ? parseInt((completedLectures / lectureList?.length) * 100) : 0;
    const scrollContainer = useRef(null);

    useEffect(() => {
        scrollContainer.current.scrollTop = readLocalStorage('scroll')?.y || 0;
    }, []);

    const allLectures = currentCourse?.sections?.map((section) => section?.lectures?.map((item) => item)).flat(1);

    const scroll = () => {
        const y = scrollContainer?.current?.scrollTop;
        bakeLocalStorage('scroll', { y });
    };

    return (
        <>
            <Header schoolThemeStyle={pageThemeStyle} school={pageContext.school} />
            <section id="lecture">
                <div className="flex-wrap lg:flex">
                    <div className="lg:w-9/12">
                        {children}
                        <div className="hidden lg:block">
                            <Footer schoolThemeStyle={pageThemeStyle} />
                        </div>
                    </div>

                    <div className="order-last w-full border-t border-gray-300 lg:border-t-0 lg:mt-10 lg:order-none lg:w-3/12 lg:mt-0">
                        <div className="container lg:max-w-full">
                            <div
                                onScroll={() => {
                                    scroll();
                                }}
                                ref={scrollContainer}
                                className="bottom-0 right-0 pt-8 pb-16 overflow-scroll border-l-0 border-gray-300 lg:border-l lg:pb-0 lg:pt-24 lg:h-full lg:w-3/12 lg:fixed sidebar"
                            >
                                <div className="py-8 text-sm text-gray-600 lg:p-4 progress">
                                    <div className="relative flex justify-between mb-2">
                                        <div>{`${progress}%`} Complete</div>
                                        <div>
                                            {course?.items?.length || 0}/{totalLectures} Lectures
                                        </div>
                                    </div>
                                    <div className="relative h-2 overflow-hidden bg-gray-400 rounded-lg">
                                        <div
                                            className={`absolute top-0 bottom-0 left-0 h-2 bg-${pageThemeStyle?.primaryColor}-500`}
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </div>
                                {lectureList && (
                                    <div className="curriculum-list space-y-6 lg:space-y-0">
                                        {_.orderBy(
                                            currentCourse?.sections,
                                            currentCourse?.sections?.[0].hasOwnProperty('order') ? 'order' : 'id',
                                            'asc'
                                        ).map((section, index) => (
                                            <Section
                                                allLectures={allLectures}
                                                lecture={lecture}
                                                data={section}
                                                size="small"
                                                key={section.id}
                                                course={currentCourse}
                                                slug={slug}
                                                isCollapse
                                                schoolThemeStyle={pageThemeStyle}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="block lg:hidden">
                <Footer schoolThemeStyle={pageThemeStyle} />
            </div>
        </>
    );
};

LayoutLecture.propTypes = {
    children: PropTypes.node.isRequired,
    pageContext: PropTypes.object,
};

LayoutLecture.defaultProps = {
    pageContext: {},
};

export default LayoutLecture;
