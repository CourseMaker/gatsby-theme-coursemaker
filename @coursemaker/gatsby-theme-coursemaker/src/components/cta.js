import React from 'react';

import { jsx } from 'theme-ui';
import { Link } from 'gatsby';
import svg from '../images/icons/icon-courses.svg';

const CTA = ({ cta, priceInfo }) => {
    let ctaText = 'Get Access';
    if (priceInfo?.product_type === 'single_course' && priceInfo?.is_active) {
        let unitAmountReadable = "";
        let unitAmount;
        if (priceInfo?.unit_amount_readable && priceInfo?.unit_amount ){
            unitAmount = priceInfo?.unit_amount / 100
            if (unitAmount.toString().split('.')[1] === "00"){
                unitAmount = unitAmount.toString().split('.')[0]
            }
            unitAmountReadable = "($" + unitAmount + ")";

        }
        ctaText = `Purchase Course ${unitAmountReadable}`;
    } else if (priceInfo?.product_type === 'school_membership' && priceInfo?.is_active) {
        ctaText = 'Purchase Membership';
    }

    return (
        <div className="mt-6 btn-wrapper lg:flex-4">
            <Link
                to="./checkout"
                className="items-center text-white bg-blue-500 text-lg btn btn-custom flex-nowrap"
                style={{ display: 'inline-flex' }}
            >
                {priceInfo && (
                    <svg className="icon-left" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                )}
                {ctaText}
            </Link>
        </div>
    );
};

export default CTA;
