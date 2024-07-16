import React, { Suspense, lazy } from "react";
import { Navigate, createHashRouter, RouterProvider } from "react-router-dom";
const Layout = lazy(() => import("@layout/index"));

const automatic = () => {
  const modules = require.context("./modules", true, /route\.tsx?$/);
  return modules.keys().flatMap((url: string) => modules(url).default);
};

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: automatic(),
  },
  {
    path: "*",
    element: <Navigate to="/404" />,
  },
]);

export const Router = () => {
  return (
    <Suspense
      fallback={
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          loading
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
};

// Can dynamically change the routing table
export const getRoutes = () => router.routes.at(0)?.children || [];
