/** @jsx jsx */
import React from "react";
import ReactMarkdown from "react-markdown";
import { jsx } from "theme-ui";

const FooterContent = ({ landingPage }) => {
  return (
    <>
      <section id="footer" className="py-8 bg-gray-700  md:py-24">
        <div className="container md:px-32">
          <div class="grid grid-cols-2 md:grid-cols-4 text-white ">
            <div class="md:mx-auto mb-4">
              <ul className="leading-loose">
                <li className="font-bold mb-2 text-lg">Main Menu</li>
                <li>Home</li>
                <li>Promotions</li>
                <li>Size and Format</li>
                <li>Custom Join</li>
                <li>Personalized Join</li>
                <li>How to Join</li>
              </ul>
            </div>
            <div class="md:mx-auto mb-4 ">
              <ul className="leading-loose">
                <li className="font-bold mb-2 text-lg">Contacts</li>
                <li>Facebook</li>
                <li>Twitter</li>
                <li>Instagram</li>
                <li>Medium</li>
                <li>Linked</li>
              </ul>
            </div>
            <div class="md:mx-auto mb-4">
              <ul className="leading-loose">
                <li className="font-bold mb-2 text-lg">Category</li>
                <li>Bayl</li>
                <li>Anak kecll</li>
                <li>ABG</li>
                <li>abg</li>
              </ul>
            </div>
            <div class="md:mx-auto">
              <ul className="leading-loose">
                <li className="font-bold mb-2 md-4 text-lg">
                  Terms and Conditions
                </li>
                <li>Home</li>
                <li>Promotions</li>
                <li>Size and Format</li>
                <li>Custom Join</li>
                <li>Personalized Join</li>
                <li>How to Join</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-gray-800 text-white text-center h-12 p-0">
        <span className="h-12 flex justify-center items-center">
          &#169; 2020. All rights reserved.
        </span>
      </div>
    </>
  );
};

export default FooterContent;
