import React from "react";
import Card from "./card";

const Courses = ({ courses, paid = false }) => {
  if (!courses) return <p>No courses available</p>;
  return (
    <section id="courses" className="py-16 md:py-32 background-green">
      <div className="container mx-auto">
        <div className="mx-auto lg:w-3/4">
          <h2 className="mb-4 lg:mb-2 text-center text-white">Courses</h2>

          <div className="card-list md:space-y-8 lg:space-y-10 space-y-6">
            {courses.map((course) => (
              <Card course={course} paid={paid} key={`course__${course.id}`} />
            ))}
          </div>
          <div className="mx-auto lg:w-3/4 text-center">
            <div className="text-center mt-6 text-md btn btn-sm btn-default">
              See all Courses
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Courses;
