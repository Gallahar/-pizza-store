import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import PizzaInfo from "./pages/PizzaInfo/PizzaInfo";

import "./scss/app.scss";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import CartEmpty from "./components/CartEmpty/CartEmpty";
import MainLayout from "./components/Layouts/MainLayout";
import { selectCartPizzas } from "./redux/slices/cartSlice";

const App: React.FC = () => {
  const { pizzas } = useSelector(selectCartPizzas);
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="Cart"
          element={pizzas.length > 0 ? <Cart /> : <CartEmpty />}
        />
        <Route path="*" element={<NotFound />} />
        <Route path="pizza/:id" element={<PizzaInfo />} />
      </Route>
    </Routes>
  );
};

export default App;
