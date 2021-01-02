import React, { useState } from "react";
import _ from "lodash";
import Lecture from "./lecture";

/* allLectures */
const Section = ({ lecture, size, data, slug, isCollapse, themeStyles }) => {
  const [toggle, setTogggle] = useState(isCollapse);
  const toggleSection = () => {
    setTogggle(!toggle);
  };

  const getArrayLength = (array) => array.length;

  let currentLecture = "";
  if (lecture) currentLecture = lecture;

  return (
    <div
      className={`${
        size === "big"
          ? "rounded-lg"
          : "rounded-lg lg:rounded-none lg:border-t lg:border-0"
      }
			border-indigo-200 bg-white curriculum-item overflow-hidden border`}
    >
      <div
        className={
          "relative pr-12 " +
          (size === "big"
            ? "py-3 md:py-4 px-4 md:px-6 md:flex items-center"
            : "p-4")
        }
      >
        <div
          className={
            "font-bold " + (size === "big" ? "text-lg md:text-2xl" : "leading-tight mb-1")
          }
        >
          {data.title}
        </div>
        <p className="ml-auto text-sm text-gray-500">
          {size === "big" ? (
            "" //<span>0/{getArrayLength(data.lectures)} Lectures Completed</span>
          ) : (
            <span>{getArrayLength(data.lectures)} Lectures</span>
          )}
        </p>

        <button
          className={`${
            size === "big"
              ? "top-0 right-0 transform translate-y-6 -translate-x-6 absolute md:relative md:translate-x-0 md:translate-y-0"
              : "absolute top-0 right-0 transform translate-y-6 -translate-x-6"
          } w-5 h-5 ml-5 cursor-pointer`}
          onClick={toggleSection}
        >
          <svg
            className="transition transform duration-300"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              transform: toggle ? "scaleY(-1)" : "",
            }}
          >
            <path
              fill="none"
              stroke="#555"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20.59 7.66l-8.69 8.68-8.49-8.48"
            />
          </svg>
        </button>
      </div>
      <div className={toggle ? "block" : "hidden"}>
        {data.lectures.length && _.orderBy(
          data?.lectures,
          data?.lectures?.[0].hasOwnProperty("order") ? "order" : "id",
          "asc"
        ).map((lecture) => {
          if (lecture?.active) {
            return (
                <Lecture
                    lecture={currentLecture}
                    slug={slug}
                    data={lecture}
                    size={size}
                    key={lecture.id}
										themeStyles={themeStyles}
                />
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default Section;
