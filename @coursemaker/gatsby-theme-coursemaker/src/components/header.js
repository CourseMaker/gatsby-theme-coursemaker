/** @jsx jsx */
import React, { useState } from "react";
import { Link } from "gatsby";
import { jsx } from "theme-ui";
import { logout, isAuthenticated } from "../auth/auth";


const Header = ({ school, themeStyles }) => {

  let homeLinks = [
    ["Overview", "/#overview"],
    ["Courses", "/#courses"],
    ["Login", "/login"],
    ["Enroll Now", "/register", "btn btn-white"],
  ];

  if (isAuthenticated()) {
    homeLinks = [
      ["Home", "/"],
      ["My Courses", "/courses"],
      ["Logout", "/"],
    ];
  }

  const [toggle, setTogggle] = useState(false);
  const toggleHeader = () => {
    setTogggle(!toggle);
  };

  return (
      <header className={`sticky top-0 z-20 shadow-md text-white bg-${themeStyles.primaryColor}-500`}>
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center">
            <Link
							className="inline-flex items-center h-20 text-lg md:h-24 logo"
                to="/"
            >
              <span className="font-semibold">{school?.name}</span>
            </Link>

            <nav
                className={`items-center order-3 w-full ml-auto list-none lg:flex lg:space-y-0 space-y-3 
						lg:space-x-6 lg:order-1 lg:w-auto py-8 lg:py-0 border-t lg:border-t-0 border-white border-opacity-25 
						${toggle ? "block" : "hidden"}`}
            >
              {homeLinks.map((link, i) => {
                let classes = "";
                if (link[2]) classes = link[2];
                if (link[0] == "Logout"){
                  return (
                      <li key={i}>
                        <Link className={classes} to={link[1]} onClick={logout}>
                          {link[0]}
                        </Link>
                      </li>
                  );
                } else {
                  return (
                      <li key={i}>
                        <Link className={classes} to={link[1]}>
                          {link[0]}
                        </Link>
                      </li>
                  );
                }})}
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
