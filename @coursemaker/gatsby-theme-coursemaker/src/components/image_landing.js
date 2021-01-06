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

	console.log(landingImage);
  if (landing)
    return (
			<div>
				{/*
				<Img
					className="object-cover w-3/4 h-40 mx-auto"
					fluid={landingImage}
					alt="cover image"
					imgStyle={{ objectPosition: "center", objectFit: "contain" }}
				/>
				*/}
				<img class="block mx-auto w-3/4" src={landingImage.src} alt="Cover Image" />
			</div>
    );
  return <div />;
};

export default LandingImage;
