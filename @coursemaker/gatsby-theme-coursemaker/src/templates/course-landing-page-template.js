import React from "react";
import ReactMarkdown from "react-markdown";
import Layout from "../components/layout";
import Button from "../components/button";
import Section from "../components/section";

const CourseLandingPage = ({ pageContext, data }) => {
  const course = pageContext.course;
  // TODO: add to data model
  const cta_section = { title: "cta test", description: "cta desc" };
  const author = { username: "joe", email: "yoyo@gmail.com" };
  const { author_display } = course;

  return (
    <Layout pageContext={pageContext}>
      <section className="py-16 pb-8 text-center md:pt-24">
        <div className="container">
          <h1 className="mb-4">{course.title}</h1>
          <p className="mx-auto mb-6 text-xl font-light leading-relaxed text-gray-700 md:mb-10 lg:text-xl lg:w-7/12 xl:w-5/12">
            {course.description_overview}
          </p>

          <Button text="Curriculum" to="./curriculum" />

          <div className="mt-12 scroll-to">
            <svg
              className="block w-6 mx-auto"
              data-name="Layer 1"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                stroke="#999"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20.59 7.66l-8.69 8.68-8.49-8.48"
              />
            </svg>
          </div>
        </div>
      </section>

      <section id="video" className="pt-16 bg-gray-100 lg:pt-32">
        <div className="container">
          <div className="mx-auto lg:w-9/12">
            <div className="shadow-xl md:shadow-2xl responsive-video">
              <iframe
                title="video"
                width="560"
                height="315"
                src="https://www.youtube.com/embed/dXu_m1LVaYA"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <section
        id="overview"
        className="py-16 text-center bg-gray-100 md:pt-24 md:pb-32"
      >
        <div className="container">
          <div className="mx-auto inner lg:w-8/12">
            <h2 className="mb-4 lg:mb-6">Overview</h2>
            <div className="leading-loose text-left text-gray-700 space-y-6">
              <ReactMarkdown source={course.description} />
            </div>
            <div className="mt-8 btn-wrapper">
              <Button text="Curriculum" to="./curriculum" />
            </div>
          </div>
        </div>
      </section>

      <section id="course" className="pt-12 pb-12 lg:py-20 lg:pb-32">
        <div className="container mx-auto">
          <div className="mx-auto inner lg:w-8/12">
            <h2 className="mt-12 mb-6 leading-tight">Curriculum</h2>
            <div className="curriculum-list space-y-6">
              {course.sections.map((section) => {
                let allLectures = course?.sections
                  ?.map((section) => section?.lectures?.map((item) => item))
                  .flat(1);

                return (
                  <Section
                    data={section}
                    size="big"
                    key={section.id}
                    allLectures={allLectures}
                    slug={course.slug}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="author" className="py-24 bg-gray-100">
        <div className="container">
          <div className="lg:items-center md:inline-flex lg:px-16 justify-content-center">
            <img
              className="block object-cover w-48 h-48 bg-gray-500 rounded-full author-photo lg:h-64 lg:w-64"
              src={
                author_display?.photo?.["url"] ??
                author_display.photo?.childImageSharp?.fluid?.src
              }
              alt={author_display.title}
            />
            <div className="w-full mt-8 md:pl-12 lg:pl-16 md:mt-0">
              <h3>{author_display.title}</h3>
              <p className="mb-6 text-xl font-light text-gray-600">
                {author_display.subtitle}
              </p>
              <div className="mb-4 leading-loose text-gray-700 md:mb-6 space-y-5">
                <ReactMarkdown source={author_display.description} />
              </div>
              <Button text="Curriculum" to="./curriculum" />
            </div>
          </div>
        </div>
      </section>

      {cta_section && (
        <section
          id="cta"
          className="py-16 text-center text-white bg-gray-900 lg:py-32"
        >
          <div className="container">
            <div className="mx-auto inner lg:w-6/12">
              <h2 className="mb-4 md:mb-6">{cta_section.title}</h2>
              <div className="leading-loose text-gray-200 space-y-6">
                <ReactMarkdown source={cta_section.description} />
              </div>
              <Button text="Purchase" to="./checkout" />
            </div>
          </div>
        </section>
      )}

      <section className="py-16 text-center bg-gray-100 md:py-32">
        <div className="container">
          <div className="mx-auto inner lg:w-5/12">
            <h2 className="mb-4 mb:mb-6">Questions?</h2>
            <div className="text-xl text-gray-700 space-y-6">
              <p>
                <span>Any questions? Send an email to</span>
                <br />
                {author && (
                  <a href={`mailto:${author.email}`} className="link">
                    {author.email}
                  </a>
                )}
              </p>
            </div>
            <div className="mt-8 btn-wrapper">
              <Button text="Curriculum" to="./curriculum" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CourseLandingPage;