import { lazy } from "react";
export default [
  {
    path: "/overview",
    Component: lazy(() => import("@/overview/pages")),
  },
];
