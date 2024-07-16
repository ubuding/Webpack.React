import React from "react";
import { createRoot } from "react-dom/client";
import { Router } from "@router";
import "@i18n";
import "@style/core";
const el = document.getElementById("root") as Element;
const root = createRoot(el);
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
);
