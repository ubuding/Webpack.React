import { lazy } from "react";
export default [
  {
    path: "/404",
    Component: lazy(() => import("@/404/pages")),
  },
];
