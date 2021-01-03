/** @jsx jsx */
import React from "react";
import ReactMarkdown from "react-markdown";
import Button from "../button";
import svg from '../../images/icons/icon-welcome.svg';
import Icon from "../icon";
import {jsx} from "theme-ui";

const OverviewSection = ({ landingPage, themeStyles }) => {
    if (landingPage == null)
        return null;

    const overviewHeading = landingPage?.overviewHeading;
    const overviewBody = landingPage?.overviewBody;  // markdown
    const overviewCTA = landingPage?.overviewCTA;

    if (overviewHeading) {
        return (
            <section id="overview" className="py-16 text-center md:py-24">
                <div className="container">
                    <div className="mx-auto inner lg:w-7/12">
												<div className="mb-12">
													<Icon color={themeStyles.primaryColor} source={svg} />
													<h2 className="">{overviewHeading}</h2>
												</div>
                        <div className="text-left text-gray-700 space-y-6">
                            <ReactMarkdown source={overviewBody}/>
                        </div>
                        <div className="mt-8 btn-wrapper">
                            {overviewCTA?.link && overviewCTA?.color &&
                                <Button
                                    to={overviewCTA?.link}
                                    text={overviewCTA?.text}
                                    color={themeStyles.primaryColor}
                                />
                            }
                        </div>
                    </div>
                </div>
            </section>
        );
    }
    return null;
};

export default OverviewSection;
