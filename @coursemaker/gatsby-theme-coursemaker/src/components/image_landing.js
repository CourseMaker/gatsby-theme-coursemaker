/** @jsx jsx */
import { jsx } from "theme-ui";
import Img from "gatsby-image";

/*...props*/
const LandingImage = ({ landing }) => {
  let landingImage;
  if (landing == null || landing == undefined || landing?.url == "")
    // default
    landingImage = { src: "https://picsum.photos/300/300" };
  else if (landing.childImageSharp != null)
    landingImage = landing.childImageSharp.fluid;
  else if (landing)
    // strapi hack
    landingImage = { src: landing?.url };

  if (landing)
    return (
      <section id="landingImage" className="py-5 bg-gray-100">
        <div className="container">
          <div className="md:flex">
            <Img
              className="object-cover h-40 mx-auto lg:w-3/4"
              fluid={landingImage}
              alt="cover image"
              imgStyle={{ objectPosition: "center", objectFit: "contain" }}
            />
          </div>
        </div>
      </section>
    );
  return <div />;
};

export default LandingImage;
