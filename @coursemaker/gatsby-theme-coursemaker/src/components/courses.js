import React from "react";
import Card from "./card";
import Icon from "./icon";
import svg from '../images/icons/icon-courses.svg';

const Courses = ({ courses, paid = false, schoolThemeStyle }) => {
  if (!courses) return <p>No courses available</p>;

  let pageThemeStyle = {"primaryColor": "blue"}
  if(schoolThemeStyle){
      pageThemeStyle = schoolThemeStyle;
  }
  return (
    <section id="courses" className="py-16 bg-gray-200 md:py-32">
      <div className="container mx-auto">
        <div className="mx-auto lg:w-3/4">
					<div className="mb-12 text-center">
						<Icon color={schoolThemeStyle.primaryColor} source={svg} />
						<h2>Courses</h2>
					</div>
          <div className="card-list md:space-y-8 space-y-6">
            {courses.map((course) => (
              <Card schoolThemeStyle={pageThemeStyle} course={course} paid={paid} key={`course__${course.id}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Courses;
