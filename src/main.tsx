import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles.css";

const restoredRoute = sessionStorage.getItem("tws:route");
if (restoredRoute) {
  sessionStorage.removeItem("tws:route");
  window.history.replaceState(null, "", restoredRoute);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
