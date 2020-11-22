/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";

const Footer = ({ school }) => {
  let themeStyles = school?.schoolThemeStyle;
  if (!themeStyles) {
    themeStyles = {
      "primary": "green",
      "secondary": "blue",
      "footer": "white",
    }
  }
  return (
      <footer
          className="py-8 text-sm"
          sx={{
            color: "background",
            backgroundColor: `primary_${themeStyles.footer}`,
          }}
        >
        <div className="container">
          <div className="flex justify-between">
            <p className="text-center text-gray-500">
              Powered by
              <a
                  href="https://coursemaker.org"
                  className="font-bold"
                  sx={{
                    color: `primary_${themeStyles.primary}`,
                  }}
              >
                {" "}
                CourseMaker
              </a>
            </p>

            <div className="flex ml-auto text-gray-500 space-x-5">
              <Link
                  to="/terms"
                  sx={{
                    color: `primary_${themeStyles.primary}`,
                  }}
              >
                Terms
              </Link>
              <Link
                  to="/privacy"
                  sx={{
                    color: `primary_${themeStyles.primary}`,
                  }}
              >
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
  );
}

export default Footer;
