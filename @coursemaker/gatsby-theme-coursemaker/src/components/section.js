import React, { useEffect, useState } from "react";
import _ from "lodash";
import { bakeLocalStorage, readLocalStorage } from "../helpers/storage";
import Lecture from "./lecture";

const Section = ({ lecture, size, data, allLectures, slug }) => {
  const [toggle, setTogggle] = useState(true);
  const toggleSection = (e) => {
    setTogggle(!toggle);
  };

  function getArrayLength(array) {
    return array.length;
  }

  let currentLecture = "";

  if (lecture) {
    currentLecture = lecture;
  }
  useEffect(() => {
    if (allLectures?.[0]) {
      const addData = async (lecture) => {
        let state = readLocalStorage(slug);
        let newState = {
          items: [...((state && state?.items) || [])],
        };

        const exists = newState.items.some((item) => item?.id === lecture?.id);

        // if item already exists in course, add quantity to item
        if (exists) {
          newState.items = newState?.items?.map((item) =>
            item?.id === lecture?.id
              ? {
                  ...item,
                }
              : item
          );
        } else {
          newState.items = [...newState?.items, { id: lecture?.id }];
        }

        bakeLocalStorage(slug, newState);
      };
      addData(allLectures[0]);
    }
  }, []);
  return (
    <div
      className={`${
        size === "big"
          ? "rounded-lg"
          : "rounded-lg lg:rounded-none lg:border-t lg:border-0"
      }
			border-indigo-200 curriculum-item overflow-hidden border`}
    >
      <div
        className={
          "bg-indigo-100 relative " +
          (size === "big"
            ? "py-3 md:py-4 px-4 md:px-6 md:flex items-center"
            : "p-4")
        }
      >
        <div
          className={
            "font-bold " + (size === "big" ? "text-lg md:text-2xl" : "")
          }
        >
          {data.title}
        </div>
        <p className="ml-auto text-sm text-gray-500">
          {size === "big" ? (
            ""//<span>0/{getArrayLength(data.lectures)} Lectures Completed</span>
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
        {_.orderBy(
          data?.lectures,
          data?.lectures?.[0].hasOwnProperty("number") ? "number" : "id",
          "asc"
        ).map((lecture, index) => {
          return (
            <Lecture
              lecture={currentLecture}
              slug={slug}
              data={lecture}
              size={size}
              key={lecture.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Section;
