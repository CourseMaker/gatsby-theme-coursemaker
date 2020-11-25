/** @jsx jsx */
import { jsx } from "theme-ui";

/*...props*/
const Video = ({ videoID }) => {
    let video_src = null;
    if (videoID) {
        let video_src = "https://www.youtube.com/embed/" + videoID;
    }

  if (video_src != null)
    return (
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
    );
  return <div />;
};

export default Video;
