import React from "react";
import { Outlet } from "react-router";
import "../../_template/css/Layout.css";
import Sidebar from "./Sidebar";
import Header from "./Header";

const RootLayout = () => {
  return (
    <>
      <head>
        <title>Admin System</title>
      </head>

      <div className="bg-dark text-light" style={{ minHeight: "100vh" }}>
        <Sidebar />

        <Header />

        <main className="p-2 main">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default RootLayout;
