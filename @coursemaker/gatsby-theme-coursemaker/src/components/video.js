/** @jsx jsx */
import { jsx } from "theme-ui";

/*...props*/
const Video = ({ lecture }) => {
  const video_src = lecture.video_id
    ? "https://www.youtube.com/embed/" + lecture.video_id
    : null;

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
