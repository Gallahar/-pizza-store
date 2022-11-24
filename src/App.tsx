import React from "react";
import { Route, Routes } from "react-router-dom";
import PizzaInfo from "./pages/PizzaInfo/PizzaInfo";

import "./scss/app.scss";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/Layouts/MainLayout";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="Cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
        <Route path="pizza/:id" element={<PizzaInfo />} />
      </Route>
    </Routes>
  );
};

export default App;
