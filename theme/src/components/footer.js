/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";

const Footer = () => {
  return (
    <footer className="py-8 text-sm">
      <div className="container">
        <div className="flex justify-between">
          <p className="text-center text-gray-500">
            Powered by
            <a
              href="http://coursemaker.org"
              className="font-bold"
              sx={{
                color: "primary",
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
                color: "primary",
              }}
            >
              Terms
            </Link>
            <Link
              to="/privacy"
              sx={{
                color: "primary",
              }}
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
