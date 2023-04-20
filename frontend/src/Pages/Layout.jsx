import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";

function Layout() {
  return (
    <div className="px-4 flex flex-col min-h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;
