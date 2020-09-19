import React from "react";
import Card from "./card";

const Courses = ({ courses }) => {
  return (
    <section id="courses" className="py-16 md:py-32">
      <div className="container mx-auto">
        <div className="mx-auto lg:w-3/4">
          <h2 className="mb-4 lg:mb-10 text-center">Courses</h2>
          <div className="card-list md:space-y-8 lg:space-y-10 space-y-6">
            {courses.map((course) => {
              return <Card course={course} key={`course__${course.id}`} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Courses;
