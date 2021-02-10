/** @jsx jsx */
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { jsx } from 'theme-ui';
import svg from '../../images/icons/icon-contact.svg';
import Icon from '../icon';

const ContactSection = ({ schoolThemeStyle = { primaryColor: 'blue' }, landingPage }) => {
    if (landingPage == null || landingPage?.contactHeading == null) return null;
    const contactHeading = landingPage?.contactHeading;
    const contactBody = landingPage?.contactBody;

    if (contactHeading) {
        return (
            <section className="py-16 text-center md:py-24">
                <div className="container">
                    <div className="mx-auto inner lg:w-7/12">
                        <div className="mb-12">
                            <Icon color={schoolThemeStyle?.primaryColor} source={svg} />
                            <h2>{contactHeading}</h2>
                        </div>
                        <div className="text-left text-gray-700 space-y-6 react-markdown">
                            <ReactMarkdown source={contactBody} />
                        </div>
                        <div className="mt-8 btn-wrapper" />
                    </div>
                </div>
            </section>
        );
    }
    return null;
};

export default ContactSection;
