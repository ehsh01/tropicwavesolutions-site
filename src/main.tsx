import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles.css";

const restoredRoute = sessionStorage.getItem("tws:route");
if (restoredRoute) {
  sessionStorage.removeItem("tws:route");
  window.history.replaceState(null, "", restoredRoute);
}

const { pathname, search, hash } = window.location;
const normalizedPath =
  pathname === "/" ? pathname : pathname.replace(/\/+$/, "");
if (normalizedPath !== pathname) {
  window.history.replaceState(null, "", `${normalizedPath}${search}${hash}`);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
