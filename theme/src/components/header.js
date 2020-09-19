/** @jsx jsx */
import { useState } from "react";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";
import { jsx } from "theme-ui";

const Header = () => {
  const { pathname } = useLocation();
  const school = { name: "Alpha School" };

  let homeLinks = [
    ["Overview", "#overview"],
    ["Courses", "#courses"],
    ["Login", "/login"],
    ["Enrol Now", "/", "btn btn-white"],
  ];

  if (pathname !== "/") {
    homeLinks = [
      ["My Courses", "/courses"],
      ["Logout", "/logout"],
    ];
  }

  const [toggle, setTogggle] = useState(false);
  const toggleHeader = () => {
    setTogggle(!toggle);
  };

  return (
    <header
      className="sticky top-0 z-20 shadow-md"
      sx={{
        color: "background",
        backgroundColor: "primary",
      }}
    >
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center lg:h-24">
          <Link
            className="inline-flex items-center h-24 text-lg logo lg:h-auto"
            to="/"
          >
            <div className="w-12 h-12 mr-4 bg-white rounded-full"></div>
            <span className="font-semibold">{school.name}</span>
          </Link>

          <nav
            className={`items-center order-3 w-full ml-auto list-none lg:flex lg:space-y-0 space-y-3 
						lg:space-x-6 lg:order-1 lg:w-auto py-8 lg:py-0 border-t lg:border-t-0 border-white border-opacity-25 
						${toggle ? "block" : "hidden"}`}
          >
            {homeLinks.map((link, i) => {
              let classes = "";
              if (link[2]) classes = link[2];
              return (
                <li key={i}>
                  <Link className={classes} to={link[1]}>
                    {link[0]}
                  </Link>
                </li>
              );
            })}
          </nav>

          <button
            tabIndex={0}
            className={`block w-8 h-6 ml-auto cursor-pointer lg:hidden burger-menu 
						${toggle ? "is-active" : ""}`}
            onClick={toggleHeader}
          >
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
