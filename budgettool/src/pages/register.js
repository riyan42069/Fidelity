import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react"; // Import Auth0 hook

const SignIn = ({ isSignUp = false }) => {
  const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    loginWithRedirect({
      screen_hint: isSignUp ? "signup" : undefined, // Redirect to sign-up if isSignUp is true
    });
  }, [loginWithRedirect, isSignUp]);

  return null; // No UI needed since redirect occurs immediately
};

export default SignIn;
