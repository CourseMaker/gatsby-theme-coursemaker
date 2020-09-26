import React from "react"
import { handleAuthentication } from "../../auth/auth"

const Callback = () => {
  handleAuthentication()

  return <p>Loading...</p>
}

export default Callback