import React, { useState } from "react";
import { Outlet } from "react-router";
import "../../_template/css/Layout.css";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Profile from "./Profile";

const RootLayout = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <head>
        <title>Admin System</title>
      </head>

      <div className="bg-dark text-light" style={{ minHeight: "100vh" }}>
        <Sidebar />

        <Header toggleProfile={() => setShow(true)} />

        <Profile show={show} toggleProfile={() => setShow(false)} />

        <main className="p-2 main" style={{ zIndex: 100 }}>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default RootLayout;
