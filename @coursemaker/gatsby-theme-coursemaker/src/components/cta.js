import React from 'react';

import Button from './button';
import {jsx} from "theme-ui";

const CTA = ({ cta, priceInfo }) => {
    let ctaText = 'Get Access';
    if (priceInfo?.product_type == 'single_course' && priceInfo?.is_active) {
        ctaText = 'Purchase Course';
    } else if (priceInfo?.product_type == 'school_membership' && priceInfo?.is_active) {
        ctaText = 'Purchase Membership';
    }

    return (
        <div className="mt-8 btn-wrapper">
            <Button
                text={ctaText}
                to="./checkout"
                to={cta?.link}
                color={cta?.color}
                text_color={cta?.textColor}
                variant={`primary_blue`}
            />
        </div>
    );
};

export default CTA;
