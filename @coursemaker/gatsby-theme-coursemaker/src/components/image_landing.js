/** @jsx jsx */
import { jsx } from "theme-ui";
import Img from "gatsby-image";

const LandingImage = ({ landing /*...props*/ }) => {
  let courseImage;
  if (landing == null)
    // default
    courseImage = { src: "https://picsum.photos/300/300" };
  else if (landing.childImageSharp != null)
    courseImage = landing.childImageSharp.fluid;
  else if (landing)
    // strapi hack
    courseImage = { src: landing.url };

  if (landing)
    return (
      <section id="landingImage" className="py-5 bg-gray-100">
        <div className="container">
          <div className="md:flex">
            <Img
              className="object-cover h-40 mx-auto lg:w-3/4"
              fluid={courseImage}
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
