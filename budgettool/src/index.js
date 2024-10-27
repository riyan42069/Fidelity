import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Auth0Provider } from "@auth0/auth0-react";

const domain = "dev-4hzy818xln1tesra.us.auth0.com";
const clientId = "9d48ulr4k5rNsGvsK5opNmTzGR7PMksE";

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
  >
    <App />
    </Auth0Provider>,
  document.getElementById("root")
);
