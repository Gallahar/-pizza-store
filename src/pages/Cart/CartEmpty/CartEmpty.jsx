import React from "react";
import cartEmpty from "../../../assets/img/CartEmpty.svg";
import styles from "./cartEmpty.module.scss";
import { Link } from "react-router-dom";
const CartEmpty = () => {
  return (
    <div className={styles.parent}>
      <h1>Ох, в вашей корзине ничего нет! </h1>
      <p>Вернитесь на главную и выберите понравившийся товар.</p>
      <img src={cartEmpty} alt="козина пуста(" />
      <div className={styles.buttonBack}>
        <Link to="/" className="button button--outline button--add go-back-btn">
          <span>Вернуться на главную</span>
        </Link>
      </div>
    </div>
  );
};

export default CartEmpty;
