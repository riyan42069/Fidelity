import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react"; // Import Auth0 hook

const SignIn = () => {
  const { loginWithRedirect } = useAuth0(); // Get login function from Auth0

  const onSignUp = () => {
    loginWithRedirect({
      screen_hint: "signup", // Trigger sign-up mode
    });
  };

  // Automatically redirect to Auth0 OAuth login page on component mount
  useEffect(() => {
    loginWithRedirect({
      connection: "google-oauth2", // Specify Google OAuth2 connection
    });
  }, [loginWithRedirect]);

  return "null"; // No UI needed since redirect occurs immediately
};

export default SignIn;
