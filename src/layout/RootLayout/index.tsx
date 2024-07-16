import React from "react";
export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full h-full overflow-hidden">{children}</div>;
};
