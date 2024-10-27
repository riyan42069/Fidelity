import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react"; // Import Auth0 hook

const ForgotPassword = () => {
  const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    loginWithRedirect({
      screen_hint: "reset_password", // Redirect to reset password screen
    });
  }, [loginWithRedirect]);

  return <div>Loading...</div>; // Optional loading message
};

export default ForgotPassword;
