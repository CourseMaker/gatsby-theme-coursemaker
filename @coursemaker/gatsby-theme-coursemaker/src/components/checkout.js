import React, { useState } from 'react'
import getStripe from '../../payments/stripejs'
import { useAuth0 } from "@auth0/auth0-react"

const buttonStyles = {
  fontSize: '13px',
  textAlign: 'center',
  color: '#000',
  padding: '12px 60px',
  boxShadow: '2px 5px 10px rgba(0,0,0,.1)',
  backgroundColor: 'rgb(255, 178, 56)',
  borderRadius: '6px',
  letterSpacing: '1.5px',
}

const buttonDisabledStyles = {
  opacity: '0.5',
  cursor: 'not-allowed',
}

const Checkout = () => {
  const { isAuthenticated, loading, logout, user, loginWithPopup } = useAuth0()
  if (loading) {
    return <p>Loading...</p>
  }

  const redirectToCheckout = async event => {
    event.preventDefault()
    const stripe = await getStripe()
    console.log(user);
    const { error } = await stripe.redirectToCheckout({
      mode: 'payment',
      lineItems: [{ price: process.env.GATSBY_BUTTON_PRICE_ID, quantity: 1 }],
      successUrl: `${window.location.origin}/callback/`,
      cancelUrl: `${window.location.origin}/`,
      customerEmail: user.email,
      clientReferenceId: 'abc',
    })
      .then(function(result){
        console.log("here");
        console.log(result);
        // TODO: update Auth0 with stripe metadata
        // TODO sign up user next (what happens if they do not sign up?)
      });


    if (error) {
      console.warn('Error:', error)
    }
  }

  return (
     <div>
      {isAuthenticated ? (
        <>
          <button onClick={(e) => redirectToCheckout(e)}>Purchase Course</button>
          <p>Check out the user data supplied by Auth0, below:</p>
          <pre>{isAuthenticated && JSON.stringify(user, null, 2)}</pre>
        </>
      ) : (
        <>
          <h2>Hi, please log in to purchase the course:</h2>
          <button onClick={() => loginWithPopup()}>Log in</button>
        </>
      )}
    </div>
  )
}

export default Checkout