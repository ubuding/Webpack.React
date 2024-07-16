import React, { useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { RootLayout } from "@layout/RootLayout";
import { ModulesLayout } from "@layout/ModulesLayout";

export default function Layout() {
  const location = useLocation();
  const single = new Set(["/"]);

  const isSingle = useMemo(() => {
    return single.has(location.pathname);
  }, [location.pathname]);

  return (
    <RootLayout>
      {isSingle ? (
        <Outlet></Outlet>
      ) : (
        <ModulesLayout>
          <Outlet></Outlet>
        </ModulesLayout>
      )}
    </RootLayout>
  );
}
