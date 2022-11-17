import React from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

const NotFoundComp: React.FC = () => {
  return (
    <>
      <div className={styles.notFound}>
        <span>🙁</span>
        <br />
        <h1>Ничего не найдено</h1>
        <p>Такой страницы не существует в нашем онлайн-магазине</p>
      </div>
      <div className={styles.buttonBack}>
        <Link to="/" className="button button--outline go-back-btn">
          <span>Вернуться на главную ?</span>
        </Link>
      </div>
    </>
  );
};

export default NotFoundComp;
