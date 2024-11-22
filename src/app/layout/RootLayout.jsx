import React from "react";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <>
      <head>
        <title>Admin System</title>
      </head>

      <div>
        <div>SideBar</div>
        <div>Header</div>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default RootLayout;
