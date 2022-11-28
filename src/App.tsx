import React from "react";
import { Route, Routes } from "react-router-dom";
import Loadable from "react-loadable";
import "./scss/app.scss";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/Layouts/MainLayout";

const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "Cart" */ "./pages/Cart"),
  loading: () => <div>Загружаю корзину...</div>,
});
const PizzaInfo = Loadable({
  loader: () =>
    import(/* webpackChunkName: "PizzaInfo" */ "./pages/PizzaInfo/PizzaInfo"),
  loading: () => <div>Загружаю информацию о пицце...</div>,
});
const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="*" element={<NotFound />} />

        <Route path="Cart" element={<Cart />} />
        <Route path="pizza/:id" element={<PizzaInfo />} />
      </Route>
    </Routes>
  );
};

export default App;
