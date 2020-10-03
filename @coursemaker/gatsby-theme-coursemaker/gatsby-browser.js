import "./src/css/tailwind.css";
import "./src/css/style.styl";

// ./gatsby-browser.js
import React from "react"
import { Auth0Provider } from "@auth0/auth0-react"
import { navigate } from "gatsby"

const onRedirectCallback = appState =>
  appState && appState.targetUrl && navigate(appState.targetUrl)

export const wrapRootElement = ({ element }, pluginOptions) => {
  return (
    <Auth0Provider
      domain={process.env.GATSBY_AUTH0_DOMAIN}
      clientId={process.env.GATSBY_AUTH0_CLIENTID}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {element}
    </Auth0Provider>
  )
}