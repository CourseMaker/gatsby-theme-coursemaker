import React from 'react';
import { Link } from 'gatsby';
import { useLocation } from '@reach/router';

import { bakeLocalStorage, readLocalStorage } from '../helpers/storage';

const Lecture = ({ lecture, size, data, slug, schoolThemeStyle }) => {
    const { title, id } = data;
    const random = (min, max) => Math.random() * (max - min) + min;

    let lectureSlug = id;
    if (data.hasOwnProperty('order') && data.order !== null){
        lectureSlug = `${id}${data.order}`;
    }

    // dummy data. needs to change later
    const progressVal = random(10, 100);
    const type = 'video';

    // pathname
    const { pathname } = useLocation();
    const arrPathname = pathname.split('/');
    const lastpath = arrPathname[arrPathname.length - 1];

    const addLectureToComplete = async (lecture) => {
        const state = await readLocalStorage(slug);

        const exists = state?.items?.some((item) => item?.id === lecture?.id);

        if (!exists && lecture) {
            const newState = {
                items: [...((state && state?.items) || [])],
            };
            newState.items = [...newState.items, { id: lecture?.id }];
            await bakeLocalStorage(slug, newState);
        }
    };
    return (
        <div className="border-t border-gray-300 lecture-item">
            {size === 'big' ? (
                <div className="p-4 md:px-6 md:py-5">
                    <div className="flex">
                        <div className="flex items-center left-side">
                            <div
                                data-type={type}
                                className="relative w-16 h-8 bg-gray-200 border border-indigo-200 rounded lecture-file"
                            >
                                {progressVal < 100 ? (
                                    <div
                                        className="absolute bottom-0 left-0 h-1 bg-blue-700 rounded-bl transform translate-y-px -translate-x-px"
                                        style={{ width: `${0}%` }}
                                    />
                                ) : (
                                    <div className="absolute top-0 right-0 w-4 h-4 bg-blue-700 rounded-full checkmark transform -translate-y-1 translate-x-1" />
                                )}
                            </div>
                            <div className="ml-4 text-sm leading-snug text-gray-700 md:text-base lecture-title">
                                {title}
                            </div>
                        </div>

                        <div className="ml-auto">
                            <Link
                                onClick={async () => {
                                    await addLectureToComplete(lecture);
                                }}
                                to={`${lastpath === 'curriculum' ? '../lectures' : './lectures'}/${lectureSlug}`}
                                className={`px-2 py-1 text-xs text-white bg-${schoolThemeStyle.primaryColor}-500 rounded shadow  
                cursor-pointer transition-all duration-300 hover:bg-${schoolThemeStyle.primaryColor}-400 transition `}
                            >
                                {type === 'video' ? 'View' : 'Download'}
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <Link
                    onClick={async () => {
                        await addLectureToComplete(lecture);
                    }}
                    to={`../${lectureSlug}`}
                    className="relative block p-4 bg-white bg-gray-100 transition transition-all duration-300 hover:bg-gray-100"
                >
                    {lecture.id === data.id && (
                        <div
                            style={{ width: '4px' }}
                            className={`absolute top-0 bottom-0 left-0 bg-${schoolThemeStyle.primaryColor}-500`}
                        />
                    )}
                    <div className="flex">
                        <div className="flex items-center left-side">
                            <div
                                data-type={type}
                                className="relative w-8 h-6 bg-gray-200 border border-indigo-200 rounded lecture-file"
                            >
                                {progressVal === 100 && (
                                    <div className="absolute top-0 right-0 w-4 h-4 bg-blue-700 rounded-full checkmark transform -translate-y-1 translate-x-1" />
                                )}
                            </div>
                            <div className="ml-4 text-sm leading-snug text-gray-700 lecture-title">{title}</div>
                        </div>
                    </div>
                </Link>
            )}
        </div>
    );
};

export default Lecture;
