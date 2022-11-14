import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import PizzaInfo from "./pages/PizzaInfo/PizzaInfo";

import "./scss/app.scss";
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart/Cart";
import NotFound from "./pages/NotFound";
import CartEmpty from "./pages/Cart/CartEmpty/CartEmpty";

function App() {
  const cartProducts = useSelector((state) => state.cart.pizzas);
  return (
    <div className="wrapper">
      <Header />
      <div className="content"></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/Cart"
          element={cartProducts.length > 0 ? <Cart /> : <CartEmpty />}
        />
        <Route path="*" element={<NotFound />} />
        <Route path="/pizza/:id" element={<PizzaInfo />} />
      </Routes>
    </div>
  );
}

export default App;
