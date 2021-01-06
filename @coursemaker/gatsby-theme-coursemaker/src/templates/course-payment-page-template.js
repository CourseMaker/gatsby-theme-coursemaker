import React, { useEffect } from "react";
import { navigate } from "gatsby";
import Layout from "../components/layout";
import Checkout from "../components/checkout";
import {isAuthenticated} from "../auth/auth";

const CoursePaymentPage = ({ pageContext = {} }) => {
  // TODO: pass course price from front matter
  // TODO: pass stripe key from site config
  useEffect(() => {
    if (!isAuthenticated()) navigate("/register");
  });
  const course = pageContext.course;
  const school = pageContext.school;
  const priceInfo = course.price_info;

	let schoolThemeStyle = pageContext.school?.schoolThemeStyle;
	if (!schoolThemeStyle) {
		schoolThemeStyle = {
            "primaryColor": "purple",
			"secondaryColor": "blue"
		}
	}

  let priceText = '';
  let recurrence = '';
  if (priceInfo?.product_type == 'single_course' && priceInfo?.is_active){
    priceText = priceInfo?.unit_amount_readable;
    recurrence = 'One-time purchase of: '
  } else if (priceInfo?.product_type == 'school_membership' && priceInfo?.is_active) {
    priceText = priceInfo?.unit_amount_readable;
    recurrence = priceInfo?.recurring_interval;
  }

  return (
    <Layout schoolThemeStyle={schoolThemeStyle} pageContext={pageContext}>
			<section className="py-16 text-center md:py-24">
        <div className="container">
					<div className="mx-auto lg:w-10/12">
						<h1 className="mb-4">{course.title}</h1>
						<h3 className="mb-4">{recurrence} {priceText}</h3>
						<Checkout schoolThemeStyle={schoolThemeStyle} school={school} course={course} />
					</div>
        </div>
      </section>
    </Layout>
  );
};

export default CoursePaymentPage;
