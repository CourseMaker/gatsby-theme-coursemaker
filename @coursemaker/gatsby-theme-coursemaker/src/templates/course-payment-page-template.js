import React from "react";
import ReactMarkdown from "react-markdown";
import Layout from "../components/layout-payment";
import Button from "../components/button";
import Section from "../components/section";

const CoursePaymentPage = ({ pageContext }) => {
  // TODO: pass course price from front matter
  // TODO: pass stripe key from site config
  const course = pageContext.course;
  const school = pageContext.school;

  return (
    <Layout>
      <section className="py-16 pb-8 text-center md:pt-24">
        <div className="container">
          <h1 className="mb-4">{course.title}</h1>
        </div>
      </section>
      <section className="py-16 pb-8 text-center md:pt-24">>
        <div class="product">
          <img
            src="https://i.imgur.com/EHyR2nP.png"
            alt="{course.title}}"
          />
          <div class="description">
            <h3>{course.title}</h3>
            <h5>{course.price}</h5>
          </div>
        </div>
        <Button id="checkout-button" text="Checkout" />
      </section>
    </Layout>
      // <script type="text/javascript">
      //   // Create an instance of the Stripe object with your publishable API key
      //   var stripe = Stripe({`school.stripe_public_key`});
      //   var checkoutButton = document.getElementById("checkout-button");
      //   checkoutButton.addEventListener("click", function () {
      //     fetch("/create-session", {
      //       method: "POST",
      //     })
      //       .then(function (response) {
      //         return response.json();
      //       })
      //       .then(function (session) {
      //         return stripe.redirectToCheckout({ sessionId: session.id });
      //       })
      //       .then(function (result) {
      //         // If redirectToCheckout fails due to a browser or network
      //         // error, you should display the localized error message to your
      //         // customer using error.message.
      //         if (result.error) {
      //           alert(result.error.message);
      //         }
      //       })
      //       .catch(function (error) {
      //         console.error("Error:", error);
      //       });
      //   });
      // </script>
  );
};

export default CoursePaymentPage;