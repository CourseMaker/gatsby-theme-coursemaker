import React from "react";

import Button from "./button";

const CTA = ({priceInfo}) => {
  let ctaText = 'Get Access'
  if (priceInfo?.product_type == 'single_course' && priceInfo?.active){
    ctaText = 'Purchase Course'
  } else if (priceInfo?.product_type == 'school_membership' && priceInfo?.active) {
    ctaText = 'Purchase Membership2'
  }

  return (
      <div className="mt-8 btn-wrapper">
        <Button text={ctaText} to="./checkout" />
      </div>
  );
};

export default CTA;
