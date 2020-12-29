/** @jsx jsx */
import React from "react";
import ReactMarkdown from "react-markdown";
import { jsx } from "theme-ui";

const FooterContent = ({ landingPage }) => {
  return (
    <>
      <div className="bg-gray-800 text-white text-center h-12 p-0">
        <span className="h-12 flex justify-center items-center">
          &#169; 2020. All rights reserved.
        </span>
      </div>
    </>
  );
};

export default FooterContent;
