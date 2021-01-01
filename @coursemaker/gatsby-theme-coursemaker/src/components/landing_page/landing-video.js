/** @jsx jsx */
import { jsx } from "theme-ui";

/*...props*/
const LandingVideo = ({ videoID }) => {
    let video_src = null;
    if (videoID) {
        video_src = "https://www.youtube.com/embed/" + videoID;
    }

  if (video_src != null) {
      return (
					<section id="video" className="py-16 bg-gray-200 md:py-32">
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
                              />
                          </div>
                      </div>
                  </div>
              </div>
          </section>
      );
  }
  return null;
};

export default LandingVideo;
