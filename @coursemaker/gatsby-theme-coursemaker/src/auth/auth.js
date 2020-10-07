import auth0 from "auth0-js"
import { useAuth0 } from "@auth0/auth0-react";
import { navigate } from "gatsby"

const isBrowser = typeof window !== "undefined";


const auth = isBrowser
  ? new auth0.WebAuth({
      domain: process.env.GATSBY_AUTH0_DOMAIN || "",
      clientID: process.env.GATSBY_AUTH0_CLIENTID || "",
      redirectUri: process.env.GATSBY_AUTH0_CALLBACK || "",
      responseType: "token id_token",
      scope: "openid profile email",
    })
  : {}

// insert after auth const
const tokens = {
  accessToken: false,
  idToken: false,
  expiresAt: false,
}

let user = {}

export const isAuthenticated = () => {
  if (!isBrowser) {
    return;
  }

  return localStorage.getItem("isLoggedIn") === "true"
}

export const login = () => {
  if (!isBrowser) {
    return
  }

  auth.authorize()
}

const setSession = (cb = () => {}) => (err, authResult) => {
  if (err) {
    navigate("/")
    cb()
    return
  }

  if (authResult && authResult.accessToken && authResult.idToken) {
    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime()
    tokens.accessToken = authResult.accessToken
    tokens.idToken = authResult.idToken
    tokens.expiresAt = expiresAt
    user = authResult.idTokenPayload
    localStorage.setItem("isLoggedIn", true)
    navigate("/account")
    cb()
  }
}

export const handleAuthentication = () => {
  if (!isBrowser) {
    return;
  }

  auth.parseHash(setSession())
}

export const getProfile = () => {
  return user
}

export const silentAuth = callback => {
  if (!isAuthenticated()) return callback()
  auth.checkSession({}, setSession(callback))
}

export const logout = () => {
  localStorage.setItem("isLoggedIn", false)
  auth.logout()
}