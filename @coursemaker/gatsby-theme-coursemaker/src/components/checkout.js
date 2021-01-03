import React, { useState } from "react";

import getStripe from "../../payments/stripejs";
import { isAuthenticated, login } from "../auth/auth";

const buttonStyles = {
  fontSize: "1.125rem",
  textAlign: "center",
  color: "#000",
  padding: "0.75rem 2.5rem",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  borderRadius: "0.5rem",
};

const buttonDisabledStyles = {
  opacity: "0.5",
  cursor: "not-allowed",
};

/*{ school, course }*/
const Checkout = ({ school, course, themeStyles }) => {

  const [loading, setLoading] = useState(false);
  const redirectToCheckout = async (event) => {
    event.preventDefault();
    setLoading(true);

    const stripe = await getStripe();
    const { error } = await stripe
      .redirectToCheckout({
        mode: "payment",
        lineItems: [{ price: process.env.GATSBY_BUTTON_PRICE_ID, quantity: 1 }],
        successUrl: `${window.location.origin}/callback/`,
        cancelUrl: `${window.location.origin}/`,
      })
      .then((/*result*/) => {
        if (!isAuthenticated()) {
          login();
          return <p>Redirecting to login...</p>;
        }
        // TODO: update Auth0 with stripe metadata
        // TODO sign up user next (what happens if they do not sign up?)
      });

    if (error) {
      console.warn("Error:", error);
      setLoading(false);
    }
  };

  return (
		<div>
			<button
				disabled={loading}
				className={`btn text-white bg-${themeStyles.primary}-500 text-lg btn-lg`}
				style={
					loading ? {buttonDisabledStyles} : {}
				}
				onClick={redirectToCheckout}
			>
				Purchase Course
			</button>
		</div>
  );
};

export default Checkout;
