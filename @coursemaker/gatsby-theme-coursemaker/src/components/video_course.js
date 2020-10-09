/** @jsx jsx */
import { jsx } from "theme-ui";

const CourseVideo = ({ course, ...props }) => {
  console.log(course);
  const video_src = course.course_video_id ? "https://www.youtube.com/embed/" + course.course_video_id : null;
  if (video_src != null){
    return (
      <section id="video" className="pt-16 bg-gray-100 lg:pt-32">
        <div className="container">
          <div className="mx-auto lg:w-9/12">
            <div className="shadow-xl md:shadow-2xl responsive-video">
              <div className="bg-black video-wrapper">
                  <iframe
                    title="video"
                    width="560"
                    height="315"
                    src={video_src}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return (<div></div>)
  }
};

export default CourseVideo;
