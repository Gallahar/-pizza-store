import React from "react";
import { Header } from "../";
import { Outlet } from "react-router-dom";
const MainLayout: React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content" />
      <Outlet />
    </div>
  );
};

export default MainLayout;
