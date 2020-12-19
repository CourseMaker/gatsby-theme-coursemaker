/** @jsx jsx */
import { jsx } from "theme-ui";
import Button from "../button";

/*...props*/
const Guarantee = ({ landingPage, themeStyles, initialCTA }) => {
  if (landingPage == null) return null;

  const guTitle = landingPage?.guaranteeTitle;
  const guBtn = landingPage?.guaranteeBtnText;

  return (
    <section
      id="cta"
      className="py-8 text-center text-white bg-gray-100 lg:py-24"
    >
      <div className="container text-center md:px-40">
        <div class="grid grid-cols-1 md:grid-cols-3 text-black">
          <div class="col-span-2 m-auto ">
            <h2 className="whitespace-pre mb-4 md:mb-0">{guTitle}</h2>
          </div>
          <div class="my-auto md:text-left">
            <Button
              to=""
              text={guBtn}
              color={initialCTA?.color}
              text_color={initialCTA?.textColor}
              variant={`primary_${themeStyles.primary}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Guarantee;
