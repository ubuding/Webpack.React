import React from "react";
import { Navigate } from "react-router-dom";
export default [
  {
    path: "/",
    element: <Navigate to="/overview" />,
  },
];
